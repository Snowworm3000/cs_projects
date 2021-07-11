import styled from 'styled-components';

const StyledCell = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.cell};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  opacity: 0.3;
`;

export default StyledCell;