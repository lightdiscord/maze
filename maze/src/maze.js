import { Node } from "./nodes";
import { Player } from "./player";

export class Maze {
    nodes = [];
    player = new Player(0.5, 0.5)
    width;
    height;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    static generateDefault(width, height) {
        const maze = new Maze(width, height);
        maze.nodes = Node.generateGrid(width, height);
        return maze;
    }

    playerForward() {
        const axis_x = Math.cos(this.player.rotation);
        const axis_y = Math.sin(this.player.rotation);

        this.player.x += axis_x * 0.15;
        this.player.y += axis_y * 0.15;
    }

    playerBackward() {
        const axis_x = Math.cos(this.player.rotation);
        const axis_y = Math.sin(this.player.rotation);

        this.player.x -= axis_x * 0.15;
        this.player.y -= axis_y * 0.15;
    }

    playerRotateLeft() {
        this.player.rotation -= 0.1;
        this.player.rotation %= Math.PI * 2;
    }

    playerRotateRight() {
        this.player.rotation += 0.1;
        this.player.rotation %= Math.PI * 2;
    }
}
