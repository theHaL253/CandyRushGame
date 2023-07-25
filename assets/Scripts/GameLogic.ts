import { _decorator, Component, instantiate, Sprite, Vec3 } from 'cc';
import { Grid } from './Grid';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;

@ccclass('GameLogic')
export class GameLogic extends Component {

    @property({
        type: Grid
    })
    public grid: Grid;

    public static instance: GameLogic = null;

    protected onLoad(): void {
        GameLogic.instance = this;
    }

    removeColorCombos() {
        let toRemove = [];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                let xCombo = [this.grid.grid[i][j]];
                let yCombo = [this.grid.grid[i][j]];

                const tileComponent = this.grid.grid[i][j].getComponent(Tile);
                const tileColor = tileComponent.getTileColor();

                // Check for horizontal combos
                for (let k = i + 1; k < 7; k++) {
                    const nextTileComponent = this.grid.grid[k][j].getComponent(Tile);
                    const nextTileColor = nextTileComponent.getTileColor();

                    if (nextTileColor == tileColor) {
                        xCombo.push(this.grid.grid[k][j]);
                    } else {
                        break;
                    }
                }
    
                // Check for vertical combos
                for (let k = j + 1; k < 7; k++) {
                    const nextTileComponent = this.grid.grid[i][k].getComponent(Tile);
                    const nextTileColor = nextTileComponent.getTileColor();
                    
                    if (nextTileColor == tileColor) {
                        yCombo.push(this.grid.grid[i][k]);
                    } else {
                        break;
                    }
                }
    
                // If a combo is found, add it to the removal list
                if (xCombo.length >= 3) {
                    toRemove.push(...xCombo);
                }
                if (yCombo.length >= 3) {
                    toRemove.push(...yCombo);
                }
            }
        }
    
        // Remove duplicates
        toRemove = Array.from(new Set(toRemove));
        
        console.log(toRemove);
    
        // Check for cross combos and remove. This means each grid[i][j] in the toRemove array is a node
        for (let node of toRemove) {
            let i = node.getComponent(Tile).i;
            let j = node.getComponent(Tile).j;

            if (i > 0 && j > 0 && i < 6 && j < 6) {
                if (toRemove.includes(this.grid.grid[i-1][j]) && toRemove.includes(this.grid.grid[i+1][j])
                    && toRemove.includes(this.grid.grid[i][j-1]) && toRemove.includes(this.grid.grid[i][j+1])) {
                    // This function is to remove cross combos
                    for (let x of [-1, 0, 1]) {
                        for (let y of [-1, 0, 1]) {
                            if (Math.abs(x) !== Math.abs(y)) {
                                this.grid.grid[i+x][j+y].destroy();
                            }
                        }
                    } 
                }
            }
        }
    
        // Remove the rest of the combos
        for (let node of toRemove) {
            node.destroy();
        }

        // this.refillTiles();
    }


    refillTiles() {
        for (let i = 0; i < this.grid.grid.length; i++) {
            for (let j = 0; j < this.grid.grid[i].length; j++) {
                if (this.grid.grid[i][j] === null) {
                    console.log(this.grid.grid[i][j]);
                    for (let k = j; k < this.grid.grid[i].length; k++) {
                        if (k < this.grid.grid[i].length - 1) {
                            this.grid.grid[i][k] = this.grid.grid[i][k + 1];
                            this.grid.grid[i][k + 1] = null;

                            console.log(this.grid.grid[i][k]);
                            if (this.grid.grid[i][k]) {

                                console.log(this.grid.grid[i][k]);
                                // Shift down the tile. 
                                // This is for set Position for the grid[i][j] after assigning the value
                                this.grid.grid[i][k].setPosition(new Vec3(i * (this.grid.tileSize + this.grid.tileSpacing), k * (this.grid.tileSize + this.grid.tileSpacing)));
                            }
                        } else {
                            // Instantiate a new tile at the top position
                            let tile = instantiate(this.grid.tilePrefab);
                            let tileComponent: Tile = tile.addComponent(Tile);
                            tileComponent.i = i;
                            tileComponent.j = k;
                            tile.parent = this.grid.node;
                            const posX = (this.grid.tileSize + this.grid.tileSpacing) * i;
                            const posY = (this.grid.tileSize + this.grid.tileSpacing) * k;
                            tile.setPosition(posX, posY);
                            this.grid.assignRandomColor(tile);
                            this.grid.grid[i][k] = tile;
                        }
                    }
                }
            }
        }
    }
}