import React, { useMemo, useState, useRef } from "react";
import { calcLocation, createIndexArray } from "../../utils/common";
import StyledCell from "./StyledCell";
import StyledGrid from "./StyledGrid";
import { calcTileSize } from "../../utils/common";
import useClickListener from "../../hooks/useClickListener";
import Tile from "../Tile";

function GameBoard({ rows, cols, spacing, boardSize, tiles }) {
  const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
    calcTileSize(boardSize, rows, cols, spacing),
  );

  const Cells = useMemo(() => {
    const cells = createIndexArray(rows * cols);
    return cells.map((c) => <StyledCell key={c} />);
  }, [rows, cols]);

  const boardRef = useRef(null)
  useClickListener(boardRef, null)

  console.log(tileWidth, tileHeight)
  return (
    <div ref={boardRef}>
      <StyledGrid
        width={boardSize}
        height={boardSize}
        rows={rows}
        cols={cols}
        spacing={spacing}>
        {Cells}
      </StyledGrid>
      {tiles?.map(({ r, c, id, value, isMerging, isNew }) => (
          <Tile
            key={id}
            width={tileWidth}
            height={tileHeight}
            x={calcLocation(tileWidth, c, spacing)}
            y={calcLocation(tileHeight, r, spacing)}
            value={value}
            isNew={isNew}
            isMerging={isMerging}
          />
        ))}
    </div>
  )
}

export default React.memo(GameBoard)