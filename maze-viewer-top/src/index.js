import { enumerate, division } from "@maze/fn-utils";

function computeNodeSize(canvas, {width, height}) {
  return Math.min(canvas.clientWidth / width, canvas.clientHeight / height);
}

function drawNode(context, x, y, node, nodeSize) {
  if (!(node.north?.opened)) {
    context.moveTo(x * nodeSize, y * nodeSize);
    context.lineTo((x + 1) * nodeSize, y * nodeSize);
  }

  if (!(node.east?.opened)) {
    context.moveTo((x + 1) * nodeSize, y * nodeSize);
    context.lineTo((x + 1) * nodeSize, (y + 1) * nodeSize);
  }

  if (!(node.south?.opened)) {
    context.moveTo(x * nodeSize, (y + 1) * nodeSize);
    context.lineTo((x + 1) * nodeSize, (y + 1) * nodeSize);
  }

  if (!(node.west?.opened)) {
    context.moveTo(x * nodeSize, y * nodeSize);
    context.lineTo(x * nodeSize, (y + 1) * nodeSize);
  }
}

export function draw(canvas, context, maze) {
  const nodeSize = computeNodeSize(canvas, maze);

  for (const { idx, item: node } of enumerate(maze.nodes)) {
    const { quotient: y, remainder: x } = division(idx, maze.width);

    drawNode(context, x, y, node, nodeSize);
  }

  context.stroke();
}
