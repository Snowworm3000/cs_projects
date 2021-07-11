import  React, { useMemo, useState } from "react";
import { createIndexArray } from "../../utils/common";
import StyledCell from "./StyledCell";
import StyledGrid from "./StyledGrid";
import { calcTileSize } from "../../utils/common";

function GameBoard({ rows, cols, spacing, boardSize }) {
    const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
      calcTileSize(boardSize, rows, cols, spacing),
    );
    
    const Cells = useMemo(() => {
        const cells = createIndexArray(rows * cols);
        return cells.map((c) => <StyledCell key={c} />);
      }, [rows, cols]);

      console.log(tileWidth, tileHeight)
    return (
        <StyledGrid
        width={boardSize}
        height={boardSize}
        rows={rows}
        cols={cols}
        spacing={spacing}>
            {Cells}
        </StyledGrid>
    )
}

export default React.memo(GameBoard)