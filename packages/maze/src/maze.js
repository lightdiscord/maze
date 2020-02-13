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

    nodeAt(x, y) {
        return this.nodes[y * this.width + x];
    }

    isColliding(x, y) {
        const node = this.nodeAt(Math.floor(x), Math.floor(y));
        const playerSize = 0.4

        const offsetX = x % 1;
        const offsetY = y % 1;

        if (offsetX < playerSize / 2 && (!node.west || node.west.closed)) {
            return true;
        }

        if (offsetX > 1 - playerSize / 2 && (!node.east || node.east.closed)) {
            return true;
        }

        if (offsetY < playerSize / 2 && (!node.north || node.north.closed)) {
            return true;
        }

        if (offsetY > 1 - playerSize / 2 && (!node.south || node.south.closed)) {
            return true;
        }

        return false;
    }

    playerForward() {
        const axis_x = Math.cos(this.player.rotation);
        const axis_y = Math.sin(this.player.rotation);

        const newX = this.player.x + axis_x * 0.15;
        const newY = this.player.y + axis_y * 0.15;

        if (!this.isColliding(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
        }
    }

    playerBackward() {
        const axis_x = Math.cos(this.player.rotation);
        const axis_y = Math.sin(this.player.rotation);

        const newX = this.player.x - axis_x * 0.15;
        const newY = this.player.y - axis_y * 0.15;

        if (!this.isColliding(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
        }
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
