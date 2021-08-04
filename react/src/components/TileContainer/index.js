const { default: styled } = require("styled-components");

const TileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    inline-size: ${props => props.inlineSize};
    position: relative;
`

export default TileContainer