import { Node } from "./nodes";

export class Maze {
    nodes = [];
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
}
