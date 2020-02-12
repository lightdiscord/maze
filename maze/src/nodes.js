import { enumerate, division } from "@maze/fn-utils";

export class Link {
  closed = true;

  a = null;
  b = null;

  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

export class Node {
  north;
  east;
  south;
  west;

  get opened() {
    return !this.closed;
  }

  static generateGrid(width, height) {
    const grid = [...Array(width * height)]
      .map(() => new Node());

    for (const { idx, item: node } of enumerate(grid)) {
      const { quotient: y, remainder: x } = division(idx, width);

      if (x != width - 1) {
        const neighbour = grid[y * width + x + 1];
        const link = new Link(node, neighbour);
        node.east = link;
        neighbour.west = link;
      }

      if (y != height - 1) {
        const neighbour = grid[(y + 1) * width + x];
        const link = new Link(node, neighbour);
        node.south = link;
        neighbour.north = link;
      }
    }

    return grid;
  }
}
