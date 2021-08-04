import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { getId, nextTileIndex } from "../utils/common";

const resetGameBoard = (rows, cols) => {
  // Index restarts from 0 on reset
  // resetTileIndex();
  const grid = createEmptyGrid(rows, cols);
  const newTiles = []
  // const emptyCells = getEmptyCellsLocation(grid);
  // const newTiles = createRandomTiles(emptyCells, rows * cols >= 24 ? 4 : 2);

  // newTiles.forEach((tile) => {
  //   grid[tile.r][tile.c] = tile;
  // });

  return {
    grid,
    tiles: newTiles,
  };
};

const createNewTile = (row, col) => {
  const index = nextTileIndex();
  const id = getId(index);
  return {
    index,
    id,
    row,
    col,
    isNew: true,
    value: hitType(row, col),
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
const hitType = (x, y) => { // TODO: Change hitType dynamically depending on the value recieved from the server
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

const movePosition = (grid, gridRef, row, col) => {
  const newGrid = grid.slice(0);
  const totalRows = newGrid.length;
  const totalCols = newGrid[0].length;
  const tiles = [];

  // const tile = newGrid[row][col];

  console.log(newGrid, gridRef.current, "the grid", row, col)

  // const currentTile = newGrid[row][col]
  // if (currentTile != null) {
  //   tiles.push({ ...currentTile, value: hitType(), isNew: false });
  // } else {
  //   const updatedTile = {
  //     ...tile,
  //     value: hitType(),
  //     row: row,
  //     col: col,
  //     isNew: false,
  //   };
  const newTile = createNewTile(row, col)
  newGrid[row][col] = newTile;

  //   tiles.push(updatedTile);
  // }

  tiles.push(newTile)

  return {
    tiles,
    grid: newGrid,
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
  // const [grid, setGrid] = useState(createEmptyGrid(rows, cols))
  const [tiles, setTiles] = useState([]);
  const [tiles2, setTiles2] = useState([])
  const pendingStackRef = useRef([]);
  const [moving, setMoving] = useState(false);
  const pauseRef = useRef(pause);

  const onMove = useCallback((x, y, width, height) => {
    if (!pauseRef.current) {
      const { gridX, gridY } = gridPosition(x, y, width, height, rows, cols)
      // console.log(x, y)
      // console.log(width, height)
      // console.log(rows, cols)
      console.log(tiles, "tiles")

      console.log(gridX - 1, gridY - 1)
      const { grid, tiles: newTiles } = movePosition(
        gridRef.current,
        gridRef,
        gridY - 1,
        gridX - 1,
      );
      gridRef.current = grid;

      console.log("move", grid)
      // pendingStackRef.current = moveStack;

      setMoving(true)
      // // Don't trigger upates if no movments
      // if (moveStack.length > 0) {
      //   setMoving(true);
      //   // Sort by index to persist iteration order of tiles array
      //   // so that transform animation won't be interrupted by rerending
      //   // when id is not changed.

      const arrayToSet = [newTiles[0], ...tiles]
      // const arrayToSet = "testing"

      console.log(tiles, newTiles[0], [newTiles[0], ...tiles2])
      setTiles(prev => [newTiles[0], ...prev]);
      // setTiles(["testing", 52])
      console.log(tiles, arrayToSet, "new tiles", [newTiles[0]])
      // }
    }
  }, [])

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
    setTiles(newTiles)
    gridRef.current = grid;
    console.log("reset 😡")
    // setGameStatus('running');
  }, [rows, cols, setGameStatus]);

  useEffect(() => {
    if (gameStatus === 'restart') {
      const r = gridRef.current.length;
      const c = gridRef.current[0].length;
      const { grid } = resetGameBoard(r, c);
      console.log("restart 😡")

      gridRef.current = grid;
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
  }, [gameStatus, setGameStatus]);

  return { tiles, onMove };
}
export default useGameBoard