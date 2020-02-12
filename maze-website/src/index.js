import { Maze } from "@maze/maze/src/maze";
import { randomize } from "@maze/maze/src/nodes";
import { draw } from "@maze/viewer-top";
import { generation } from "@maze/maze/generating";

const maze = Maze.generateDefault(20, 10);
generation(maze);

const viewTop = document.querySelector("canvas#view-top");

console.log(maze, viewTop);

draw(viewTop, viewTop.getContext('2d'), maze);
