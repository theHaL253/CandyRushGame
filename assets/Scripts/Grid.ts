import { _decorator, Component, Node, Prefab, instantiate, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    @property({
        type: Prefab
    })
    private tilePrefab = null;

    private grid: Node[][] = [];

    @property
    private tileSpacing: number = 1; // Spacing between tiles

    @property
    private tileSize: number = 100;

    start() {
        this.createGrid();
    }

    createGrid() {
        // const tileSize = 100; // Change this according to your desired tile size

        for (let i = 0; i < 7; i++) {
            this.grid[i] = [];

            for (let j = 0; j < 7; j++) {
                const tile = instantiate(this.tilePrefab);
                tile.parent = this.node;

                // Calculate tile position with spacing
                const posX = (this.tileSize + this.tileSpacing) * i;
                const posY = (this.tileSize + this.tileSpacing) * j;

                tile.setPosition(posX, posY);

                // Assign random color to the tile
                this.assignRandomColor(tile);

                
                //to assign a tile to the position above
                this.grid[i][j] = tile;
            }
        }
    }

    assignRandomColor(tile: Node) {
        const colors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.BLACK];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];

        const tileSprite = tile.getComponent(cc.Sprite);
        if (tileSprite) {
            tileSprite.node.color = color;
        }
    }
}


