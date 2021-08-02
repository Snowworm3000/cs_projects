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

let _tileIndex = 0
export const nextTileIndex = () => _tileIndex++;

export const getId = (ind) => `${ind}_${Date.now()}`;