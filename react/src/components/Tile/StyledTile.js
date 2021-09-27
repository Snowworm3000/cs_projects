import styled from 'styled-components';

const StyledTile = styled.div.attrs(
  ({ width, height, x, y }) => ({
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `${`translate(${x}px, ${y}px)`}`,
    },
  }),
)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  transition: transform 0.15s ease-in-out;
  background: none;
`;

export default StyledTile;