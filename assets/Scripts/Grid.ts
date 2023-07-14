import { _decorator, Component, Node, Prefab, instantiate, Sprite, Color, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    @property({
        type: Prefab
    })
    public tilePrefab = null;

    public grid: Node[][] = [];

    @property
    public tileSpacing: number = 10; // Spacing between tiles

    @property
    public tileSize: number = 100;

    @property({
        type: Node
    })
    public tile = null;

    public touchStartPos: Vec3 = new Vec3(0,0,0);

    start() {
        this.createGrid();
    }

    createGrid() {
        // const tileSize = 100; // Change this according to your desired tile size

        for (let i = 0; i < 7; i++) {
            this.grid[i] = [];

            for (let j = 0; j < 7; j++) {
                this.tile = instantiate(this.tilePrefab);
                this.tile.parent = this.node;

                // Calculate tile position with spacing
                const posX = (this.tileSize + this.tileSpacing) * i;
                const posY = (this.tileSize + this.tileSpacing) * j;

                this.tile.setPosition(posX, posY);

                //Swipe logic of each tile
                this.tile.on(Node.EventType.TOUCH_START, (eventTouch) => {
                    this.touchStartPos = eventTouch.getLocation();
                })

                //This touch will end at another tile. Not sure if this tile was sticked right way.
                this.tile.on(Node.EventType.TOUCH_CANCEL, (eventTouch) => {
                    if (!this.touchStartPos) return;
        
                    const touchCancelPos = eventTouch.getLocation();
                    const deltaX = touchCancelPos.x - this.touchStartPos.x;
                    const deltaY = touchCancelPos.y - this.touchStartPos.y;

                    // console.log(touchCancelPos, deltaX, deltaY);
        
                    const thresHoldMin = this.tileSpacing; // Minimum distance for a valid swipe
                    const thresHoldMax = this.tileSize; // Maximum distance for a valid swipe
        
                    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY); // I would check the right or left of this swipe later on: Done
                    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);
        
                    // console.log(isHorizontalSwipe, isVerticalSwipe);
                    //Logic Event goes here
                    if (isHorizontalSwipe) {
                        if (deltaX > thresHoldMin && deltaX < thresHoldMax) {
                            console.log('Swipe right');
                            // Handle swipe right event
                        } else if (deltaX < -thresHoldMin && deltaX > -thresHoldMax) {
                            console.log('Swipe left');
                            // Handle swipe left event
                        }
                    } else if (isVerticalSwipe) {
                        if (deltaY > thresHoldMin && deltaY < thresHoldMax) {
                            console.log('Swipe up');
                            // Handle swipe up event
                        } else if (deltaY < -thresHoldMin && deltaY > -thresHoldMax) {
                            console.log('Swipe down');
                            // Handle swipe down event
                        }
                    } else {
                        return false;
                    }
                })

                // Assign random color to the tile
                this.assignRandomColor();

                //Handle swipe for each tile

                
                //to assign a tile to the position above, important
                this.grid[i][j] = this.tile;
            }
        }
    }

    assignRandomColor() {
        const colors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.MAGENTA];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];

        const tileSprite = this.tile.getComponentInChildren(Sprite);
        if (tileSprite) {
            //Not sure about the set color function
            tileSprite.color = color;
            console.log(tileSprite.color);
        }
    }


    public swapTiles(touchStartPos, touchEndPos) {
        this.tile.setPosition(touchEndPos);
        t
        this.tile.setPosition(touchStartPos);
    }
}


