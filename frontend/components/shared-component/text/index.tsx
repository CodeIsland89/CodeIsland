import styled from 'styled-components';

type Props = {
  fontSize?: string
  color?: string
};

const Default = {
  color: '#000000',
  fontSize: '1rem',
};

const Text = styled.div<Props>`
  color: ${(props) => (props.color ? props.color : Default.color)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : Default.fontSize)};
`;

export default Text;
