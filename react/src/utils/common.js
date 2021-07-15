export const createIndexArray = (len) => Array.from(Array(len).keys());

export const calcSegmentSize = (
  length, segmentNum, spacing
) => (length - (segmentNum + 1) * spacing) / segmentNum;

export const calcTileSize = (
  gridSize, rows, cols, spacing,
) => ({
  width: calcSegmentSize(gridSize, cols, spacing),
  height: calcSegmentSize(gridSize, rows, spacing),
});

export const calcLocation = (l, c, spacing) =>
  (spacing + l) * c + spacing;