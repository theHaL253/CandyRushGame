import { _decorator, Component, Node, Prefab, instantiate, Sprite, Color, Vec3, v3 } from 'cc';
import { Grid } from './Grid';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    public i: number;
    public j: number;
    public type: string = "";

    // public tileColor: Color;

    // start() {
    //     const tileSprite = this.getComponentInChildren(Sprite);
    //     if (tileSprite) {
    //         this.tileColor = tileSprite.color;
    //     }
    // }

    getTileColor(): string {
        console.log(this.type);
        return this.type;
        // return this.tileColor;
    }

    swipeRight() {
        // console.log(this.grid[i][j].position, this.grid[i + 1][j].position);

        let pos1 = v3(Grid.instance.grid[this.i][this.j].position.x, Grid.instance.grid[this.i][this.j].position.y);
        let pos2 = v3(Grid.instance.grid[this.i + 1][this.j].position.x, Grid.instance.grid[this.i + 1][this.j].position.y);

        console.log(this.i,this.j);
        Grid.instance.grid[this.i][this.j].setPosition(pos2);
        Grid.instance.grid[this.i + 1][this.j].setPosition(pos1);
        // console.log(this.grid[i][j].position, this.grid[i + 1][j].position)


        //Update the grid array
        const tempTile1 = Grid.instance.grid[this.i][this.j];
        const tempTile2 = Grid.instance.grid[this.i + 1][this.j];
        Grid.instance.grid[this.i][this.j] = tempTile2;
        Grid.instance.grid[this.i + 1][this.j] = tempTile1;

        // // Update indices i and j
        const tempI = tempTile1.getComponent(Tile).i;
        const tempJ = tempTile2.getComponent(Tile).j;
        tempTile1.getComponent(Tile).i = tempTile2.getComponent(Tile).i;
        tempTile1.getComponent(Tile).j = tempTile2.getComponent(Tile).j;
        tempTile2.getComponent(Tile).i = tempI;
        tempTile2.getComponent(Tile).j = tempJ;
        console.log(this.i,this.j);
    }

    swipeLeft() {
        // console.log(this.grid[i][j].position, this.grid[i + 1][j].position);

        let pos1 = v3(Grid.instance.grid[this.i][this.j].position.x, Grid.instance.grid[this.i][this.j].position.y);
        let pos2 = v3(Grid.instance.grid[this.i - 1][this.j].position.x, Grid.instance.grid[this.i - 1][this.j].position.y);


        Grid.instance.grid[this.i][this.j].setPosition(pos2);
        Grid.instance.grid[this.i - 1][this.j].setPosition(pos1);
        // console.log(this.grid[i][j].position, this.grid[i + 1][j].position)


        //Update the grid array
        const tempTile1 = Grid.instance.grid[this.i][this.j];
        const tempTile2 = Grid.instance.grid[this.i - 1][this.j];
        Grid.instance.grid[this.i][this.j] = tempTile2;
        Grid.instance.grid[this.i - 1][this.j] = tempTile1;

        // // Update indices i and j
        const tempI = tempTile1.getComponent(Tile).i;
        const tempJ = tempTile2.getComponent(Tile).j;
        tempTile1.getComponent(Tile).i = tempTile2.getComponent(Tile).i;
        tempTile1.getComponent(Tile).j = tempTile2.getComponent(Tile).j;
        tempTile2.getComponent(Tile).i = tempI;
        tempTile2.getComponent(Tile).j = tempJ;

    }

    swipeUp() {

        let pos1 = v3(Grid.instance.grid[this.i][this.j].position.x, Grid.instance.grid[this.i][this.j].position.y);
        let pos2 = v3(Grid.instance.grid[this.i][this.j+1].position.x, Grid.instance.grid[this.i][this.j+1].position.y);


        Grid.instance.grid[this.i][this.j].setPosition(pos2);
        Grid.instance.grid[this.i][this.j+1].setPosition(pos1);


        //Update the grid array
        const tempTile1 = Grid.instance.grid[this.i][this.j];
        const tempTile2 = Grid.instance.grid[this.i][this.j+1];
        Grid.instance.grid[this.i][this.j] = tempTile2;
        Grid.instance.grid[this.i][this.j+1] = tempTile1;


        // // Update indices i and j
        const tempI = tempTile1.getComponent(Tile).i;
        const tempJ = tempTile2.getComponent(Tile).j;
        tempTile1.getComponent(Tile).i = tempTile2.getComponent(Tile).i;
        tempTile1.getComponent(Tile).j = tempTile2.getComponent(Tile).j;
        tempTile2.getComponent(Tile).i = tempI;
        tempTile2.getComponent(Tile).j = tempJ;
    }

    swipeDown() {

        let pos1 = v3(Grid.instance.grid[this.i][this.j].position.x, Grid.instance.grid[this.i][this.j].position.y);
        let pos2 = v3(Grid.instance.grid[this.i][this.j-1].position.x, Grid.instance.grid[this.i][this.j-1].position.y);


        Grid.instance.grid[this.i][this.j].setPosition(pos2);
        Grid.instance.grid[this.i][this.j-1].setPosition(pos1);


        //Update the grid array
        const tempTile1 = Grid.instance.grid[this.i][this.j];
        const tempTile2 = Grid.instance.grid[this.i][this.j-1];
        Grid.instance.grid[this.i][this.j] = tempTile2;
        Grid.instance.grid[this.i][this.j-1] = tempTile1;


        // // Update indices i and j
        const tempI = tempTile1.getComponent(Tile).i;
        const tempJ = tempTile2.getComponent(Tile).j;
        tempTile1.getComponent(Tile).i = tempTile2.getComponent(Tile).i;
        tempTile1.getComponent(Tile).j = tempTile2.getComponent(Tile).j;
        tempTile2.getComponent(Tile).i = tempI;
        tempTile2.getComponent(Tile).j = tempJ;
    }
}