import styled from 'styled-components';

const StyledGrid = styled.div`
  box-sizing: border-box;
  display: grid;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  grid-gap: ${({ spacing }) => `${spacing}px ${spacing}px`};
  background-color: #ff00ff;
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  border: ${({ spacing }) =>
    `${spacing}px solid #00ff00`};
`;

export default StyledGrid;