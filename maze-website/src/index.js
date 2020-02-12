import { Maze } from "@maze/maze/src/maze";
import { draw } from "@maze/viewer-top";
import { generation } from "@maze/maze/src/generating";
import { charCode } from "@maze/fn-utils";

const maze = Maze.generateDefault(20, 10);
generation(maze);

const viewTop = document.querySelector("canvas#view-top");

const contextTop = viewTop.getContext("2d");

function drawTop() {
    draw(viewTop, viewTop.getContext('2d'), maze);
    requestAnimationFrame(drawTop);
}

requestAnimationFrame(drawTop);

const KEY_CODES = {
    KEY_UP: 38,
    KEY_DOWN: 40,
    KEY_LEFT: 37,
    KEY_RIGHT: 39
};

document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case KEY_CODES.KEY_UP:
            maze.playerForward();
            break;
        case KEY_CODES.KEY_DOWN:
            maze.playerBackward();
            break;
        case KEY_CODES.KEY_LEFT:
            maze.playerRotateLeft();
            break;
        case KEY_CODES.KEY_RIGHT:
            maze.playerRotateRight();
            break;
    }
});