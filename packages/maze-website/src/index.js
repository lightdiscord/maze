import { Maze } from "@maze/maze/src/maze";
import { draw as drawTop } from "@maze/viewer-top";
import { draw as drawFps } from "@maze/viewer-fps";
import { generation } from "@maze/maze/src/generating";

const maze = Maze.generateDefault(20, 10);
generation(maze);

const viewTop = document.querySelector("canvas#view-top");
const contextTop = viewTop.getContext("2d");

const viewFps = document.querySelector("canvas#view-fps");
const contextFps = viewFps.getContext("2d");

function draw() {
    drawTop(viewTop, contextTop, maze);
    drawFps(viewFps, contextFps, maze);
}

requestAnimationFrame(draw);

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
            requestAnimationFrame(draw);
            break;
        case KEY_CODES.KEY_DOWN:
            maze.playerBackward();
            requestAnimationFrame(draw);
            break;
        case KEY_CODES.KEY_LEFT:
            maze.playerRotateLeft();
            requestAnimationFrame(draw);
            break;
        case KEY_CODES.KEY_RIGHT:
            maze.playerRotateRight();
            requestAnimationFrame(draw);
            break;
    }
});