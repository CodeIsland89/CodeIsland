import styled from 'styled-components';

type Props = {
  direction?: string;
  alignItems?: string;
};

const Box = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'column')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'flex-start')};
`;

export default Box;
