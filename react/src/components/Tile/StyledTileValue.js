import styled from 'styled-components';
// import { pop, scaleUp } from '../../utils/animation';

const StyledTileValue = styled.div`
  width: 100%;
  height: 100%;
  font-size: inherit;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${props => props.theme.colors.hit};
  color: ${({ theme: { palette }, value }) =>
    value > 4 ? palette.foreground : palette.primary};
  user-select: none;
`;

export default StyledTileValue;