import styled from 'styled-components';

const StyledGrid = styled.div`
  box-sizing: border-box;
  display: grid;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  grid-gap: ${({ spacing }) => `${spacing}px ${spacing}px`};
  background-color: ${props => props.theme.colors.gridBackground};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  border: ${({ spacing }) =>
    `${spacing}px solid `} ${props => props.theme.colors.gridOutline};
`;

export default StyledGrid;