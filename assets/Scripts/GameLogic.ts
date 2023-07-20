import { _decorator, Component, Sprite } from 'cc';
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
        console.log("asdasd");
        let toRemove = [];
    
        // Check for horizontal and vertical combos
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let xCombo = [this.grid[i][j]];
                let yCombo = [this.grid[i][j]];
                
    
                // Check for horizontal combos. Understand it!
                for (let k = i + 1; k < 7; k++) {
                    if (this.grid[k][j].getComponentInChildren(Sprite).color.equals(this.grid[i][j].getComponentInChildren(Sprite).color)) {
                        xCombo.push(this.grid[k][j]);
                    } else {
                        break;
                    }
                }

                console.log(xCombo);
    
                // Check for vertical combos. Understand it!
                for (let k = j + 1; k < this.grid[i].length; k++) {
                    if (this.grid[i][k].getComponentInChildren(Sprite).color.equals(this.grid[i][j].getComponentInChildren(Sprite).color)) {
                        yCombo.push(this.grid[i][k]);
                    } else {
                        break;
                    }
                }
    
                // If a combo is found, add it to the removal list
                if (xCombo.length >= 3) {
                    toRemove.push(xCombo);
                }
                if (yCombo.length >= 3) {
                    toRemove.push(yCombo);
                }
            }
        }

        console.log(toRemove);
    
        // Remove duplicates
        toRemove = Array.from(new Set(toRemove));
    
        // Check for cross combos and remove. This means each grid[i][j] in the toRemove array is a node
        for (let node of toRemove) {
            let i = node.getComponent(Tile).i;
            let j = node.getComponent(Tile).j;
    
            if (i > 0 && j > 0 && i < 6 && j < this.grid[i].length - 1) {
                if (toRemove.includes(this.grid[i-1][j]) && toRemove.includes(this.grid[i+1][j])
                    && toRemove.includes(this.grid[i][j-1]) && toRemove.includes(this.grid[i][j+1])) {
                    
                    // This function is to remove cross combos
                    for (let x of [-1, 0, 1]) {
                        for (let y of [-1, 0, 1]) {
                            if (Math.abs(x) !== Math.abs(y)) {
                                this.grid[i+x][j+y].destroy();
                            }
                        }
                    } 
                }
            }
        }
        console.log(toRemove);
    
        // Remove the rest of the combos
        for (let node of toRemove) {
            node.destroy();
        }
    }
}