import { _decorator, Component, Node, Prefab, instantiate, Sprite, Color, Vec3, v3, find } from 'cc';
import { Tile } from './Tile';
import { GameLogic } from './GameLogic';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    @property({
        type: Prefab
    })
    public tilePrefab = null;

    public gameLogic: GameLogic = null;

    @property
    public tileSpacing: number = 10; // Spacing between tiles

    @property
    public tileSize: number = 100;

    public touchStartPos: Vec3 = new Vec3(0, 0, 0);
    public touchCancelPos: Vec3 = new Vec3(0, 0, 0);
    public grid: Node[][] = [];
    public static instance: Grid = null;

    protected onLoad(): void {
        Grid.instance = this;
    }

    start() {
        this.createGrid();
    }

    createGrid() {
        // const tileSize = 100; // Change this according to your desired tile size

        for (let i = 0; i < 7; i++) {
            this.grid[i] = [];

            for (let j = 0; j < 7; j++) {
                let tile = instantiate(this.tilePrefab);
                let tileComponent: Tile = tile.addComponent(Tile);
                //We have to assign the i, j public variable from Tile.ts file to the current i and j value 
                tileComponent.i = i;
                tileComponent.j = j;

                tile.parent = this.node;

                // Calculate tile position with spacing
                const posX = (this.tileSize + this.tileSpacing) * i;
                const posY = (this.tileSize + this.tileSpacing) * j;

                tile.setPosition(posX, posY);

                //Swipe logic of each tile
                tile.on(Node.EventType.TOUCH_START, (eventTouch) => {
                    this.touchStartPos = eventTouch.getLocation();
                })

                //This touch will end at another tile. Not sure if this tile was sticked right way.
                tile.on(Node.EventType.TOUCH_CANCEL, (eventTouch) => {
                    if (!this.touchStartPos) return;

                    this.touchCancelPos = eventTouch.getLocation();
                    const deltaX = this.touchCancelPos.x - this.touchStartPos.x;
                    const deltaY = this.touchCancelPos.y - this.touchStartPos.y;

                    const thresHoldMin = this.tileSpacing; // Minimum distance for a valid swipe
                    const thresHoldMax = this.tileSize; // Maximum distance for a valid swipe

                    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
                    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);

                    //Logic Event goes here
                    if (isHorizontalSwipe) {
                        if (deltaX > thresHoldMin && deltaX < thresHoldMax) {
                            tileComponent.swipeRight();
                        } else if (deltaX < -thresHoldMin && deltaX > -thresHoldMax) {
                            tileComponent.swipeLeft();
                        }
                    } else if (isVerticalSwipe) {
                        if (deltaY > thresHoldMin && deltaY < thresHoldMax) {
                            tileComponent.swipeUp();
                        } else if (deltaY < -thresHoldMin && deltaY > -thresHoldMax) {
                            tileComponent.swipeDown();
                        }
                    } else {
                        return false;
                    }
                })

                //to assign a tile to the position above, important
                this.grid[i][j] = tile;

                // Assign random color to the tile
                this.assignRandomColor(tile);

                //Delete combos 
                // this.gameLogic.removeColorCombos();
            }
        }
        this.gameLogic = GameLogic.instance;
        this.scheduleOnce(() => {
            this.gameLogic.removeColorCombos();
        }, 1)
    }


    assignRandomColor(tile) {
        const colors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.MAGENTA];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];

        const tileSprite = tile.getComponentInChildren(Sprite);
        if (tileSprite) {
            //Not sure about the set color function
            tileSprite.color = color;
        }
    }
}