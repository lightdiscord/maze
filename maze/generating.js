import { randomItem } from "@maze/fn-utils";
import { Link } from "./src/nodes";

const VISITED = Symbol();

export function generation(maze) {
    const stack = [];
    const starting = maze.nodes[0];
    starting[VISITED] = true;
    stack.push(starting);

    while (stack.length > 0) {
        const cell = stack.pop();

        const neighbours = [...cell.neighbours()];
        const unvisitedNeighbours = neighbours.filter(node => !node[VISITED]);

        if (unvisitedNeighbours.length > 0) {
            stack.push(cell);
            const random = randomItem(unvisitedNeighbours);
            Link.findLink(cell, random).closed = false;
            random[VISITED] = true;
            stack.push(random);
        }
    }
}