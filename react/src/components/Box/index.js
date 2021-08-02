import styled, { css } from 'styled-components';


const getBoxSizeStyles = ({
  position,
  boxSizing,
  top,
  left,
  right,
  bottom,
  inlineSize,
  blockSize,
  minBlockSize,
  minInlineSize,
  maxBlockSize,
  maxInlineSize,
  paddingBlock,
  paddingInline,
  marginBlock,
  marginInline,
}) => css`
  position: ${position};
  box-sizing: ${boxSizing};
  top: ${top};
  left: ${left};
  right: ${right};
  bottom: ${bottom};
  width: ${inlineSize};
  height: ${blockSize};
  min-width: ${minInlineSize};
  min-height: ${minBlockSize};
  max-width: ${maxInlineSize};
  max-height: ${maxBlockSize};
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justifyContent};
  background-color: transparent;
  pointer-events: none;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.foreground};
  ${getBoxSizeStyles}
`;

export default StyledBox;
