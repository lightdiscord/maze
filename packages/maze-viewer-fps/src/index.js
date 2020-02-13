import { enumerate, division, filterMap } from "@maze/fn-utils";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(other) {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
    }
}

class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    collide(other) {
        const { x: x1, y: y1 } = this.a;
        const { x: x2, y: y2 } = this.b;
        const { x: x3, y: y3 } = other.a;
        const { x: x4, y: y4 } = other.b;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator === 0) {
            return null;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
        if (!(t >= 0 && u >= 0 && u <= 1)) {
            return null;
        }

        return new Point(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    }
}

function mazeBorders(maze) {
    return [
        new Line(new Point(0, 0), new Point(maze.width, 0)),
        new Line(new Point(maze.width, 0), new Point(maze.width, maze.height)),
        new Line(new Point(0, maze.height), new Point(maze.width, maze.height)),
        new Line(new Point(0, 0), new Point(0, maze.height))
    ];
}

function mazeWalls(maze) {
    const walls = mazeBorders(maze);

    for (const { idx, item: node } of enumerate(maze.nodes)) {
        const { quotient: y, remainder: x } = division(idx, maze.width);

        if (node.south && node.south.closed) {
            walls.push(new Line(new Point(x, y + 1), new Point(x + 1, y + 1)));
        }

        if (node.east && node.east.closed) {
            walls.push(new Line(new Point(x + 1, y), new Point(x + 1, y + 1)));
        }
    }

    return walls;
}

export function draw(canvas, context, maze) {
    const { player } = maze;
    const walls = mazeWalls(maze);

    const playerPosition = new Point(player.x, player.y);

    const view = new Line(
        playerPosition,
        new Point(
            player.x + Math.cos(player.rotation) * 10,
            player.y + Math.sin(player.rotation) * 10
        )
    );

    const collisions = filterMap(view.collide.bind(view), walls)
        .map(playerPosition.distance.bind(playerPosition));

    const minimum = Math.min(...collisions);

    const color = Math.max(Math.min(255 - minimum * 50, 255), 0);

    context.fillStyle = `rgb(${color}, ${color}, ${color})`;
    console.log(color);
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    console.log(collisions);
}