import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";

const resetGameBoard = (rows, cols) => {
  // Index restarts from 0 on reset
  // resetTileIndex();
  const grid = createEmptyGrid(rows, cols);
  // const emptyCells = getEmptyCellsLocation(grid);
  // const newTiles = createRandomTiles(emptyCells, rows * cols >= 24 ? 4 : 2);

  // newTiles.forEach((tile) => {
  //   grid[tile.r][tile.c] = tile;
  // });

  return {
    grid,
    // tiles: newTiles,
  };
};

const createRow = (rows, cb) =>
  Array.from(Array(rows)).map((_, r) => cb(r));

const createEmptyGrid = (rows, cols) =>
  createRow(rows, () => createRow(cols, () => undefined));

const isWin = () => {
  return false
}

const types = {
  miss: 0,
  hit: 1,
  sink: 2
}
const hitType = (x, y) => {
  return types.miss
}



function cellLocation(coordinate, length, gridSize) { // Locates the cell position knowing the length of the board (either width or height) by finding the maximum individual cell length and rounding up the coordinate divided by the maximum cell length.
  const max = length / gridSize
  const cell = Math.ceil(coordinate / max)
  return cell
}

function gridPosition(x, y, width, height, rows, cols) {
  return {
    gridX: cellLocation(x, width, cols),
    gridY: cellLocation(y, height, rows)
  }
}

const moveInDirection = (grid, x, y) => {
  const newGrid = grid.slice(0);
  const totalRows = newGrid.length;
  const totalCols = newGrid[0].length;

  newGrid[y][x] = hitType()

  return {
    grid: newGrid,
    // moveSack,
  };
}

function useGameBoard({
  rows,
  cols,
  pause,
  gameStatus,
  setGameStatus,
}) {
  const gridRef = useRef(createEmptyGrid(rows, cols));
  const [tiles, setTiles] = useState([]);
  const pendingStackRef = useRef([]);
  const [moving, setMoving] = useState(false);
  const pauseRef = useRef(pause);

  const onMove = useCallback((x, y, width, height) => {
    if (pendingStackRef.current.length === 0 && !pauseRef.current) {
      const { gridX, gridY } = gridPosition(x, y, width, height, rows, cols)
      // console.log(x, y)
      // console.log(width, height)
      // console.log(rows, cols)
      console.log(gridX -1, gridY -1)
      const { grid } = moveInDirection(
        gridRef.current,
        gridX - 1,
        gridY - 1,
      );
      gridRef.current = grid;
      // pendingStackRef.current = moveStack;

      // // Don't trigger upates if no movments
      // if (moveStack.length > 0) {
      //   setMoving(true);
      //   // Sort by index to persist iteration order of tiles array
      //   // so that transform animation won't be interrupted by rerending
      //   // when id is not changed.
      //   setTiles(sortTiles(newTiles));
      // }
    }
  }, []);

  const onMovePending = useCallback(() => {
    pendingStackRef.current.pop();
    setMoving(pendingStackRef.current.length > 0);
  }, []);

  // useLayoutEffect(() => {
  //   if (!moving) {
  //     const { tiles: newTiles, score, grid } = mergeAndCreateNewTiles(
  //       gridRef.current,
  //     );
  //     gridRef.current = grid;

  //     addScore(score);
  //     setTiles(sortTiles(newTiles));
  //   }
  // }, [moving, addScore]);

  useLayoutEffect(() => {
    pauseRef.current = pause;
  }, [pause]);

  useEffect(() => {
    const { grid, tiles: newTiles } = resetGameBoard(rows, cols);
    gridRef.current = grid;
    setTiles(newTiles);
    // setGameStatus('running');
  }, [rows, cols, setGameStatus]);

  useEffect(() => {
    if (gameStatus === 'restart') {
      const r = gridRef.current.length;
      const c = gridRef.current[0].length;
      const { grid, tiles: newTiles } = resetGameBoard(r, c);

      gridRef.current = grid;
      setTiles(newTiles);
      // setGameStatus('running');
    }
    // } else if (gameStatus === 'running' && isWin(tiles)) {
    //   setGameStatus('win');
    // }
    // } else if (
    //   gameStatus !== 'lost' &&
    //   !canGameContinue(gridRef.current, tiles)
    // ) {
    //   setGameStatus('lost');
    // }
  }, [tiles, gameStatus, setGameStatus]);

  return { tiles, onMove, onMovePending };
}
export default useGameBoard