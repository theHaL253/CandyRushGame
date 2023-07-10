import { _decorator, Component, Node, Prefab, instantiate, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    @property({
        type: Prefab
    })
    private tilePrefab = null;

    private grid: Node[][] = [];

    start() {
        this.createGrid();
        console.log("123");
    }

    createGrid() {
        const tileSize = 100; // Change this according to your desired tile size

        for (let i = 0; i < 7; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 7; j++) {
                const tile = instantiate(this.tilePrefab);
                tile.parent = this.node;
                tile.setPosition(i * tileSize, j * tileSize);

                // // Add color to the tile
                // const tileSprite = tile.getComponent(Sprite);
                // if (tileSprite) {
                //     const color = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
                //     tileSprite.node.color = color;
                // }

                this.grid[i][j] = tile;
            }
        }
    }
}


