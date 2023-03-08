import styled from 'styled-components';
import color from '../../../theme/color';

type Props = {
  bgColor?: string;
  color?: string;
};

const Button = styled.button<Props>`
  background-color: ${(props) => (props.bgColor ? props.bgColor : color.grey_100)};
  color: ${(props) => (props.color ? props.color : color.black)};
  padding: 0.5rem 1rem;
  border: ${color.black} 0.05rem solid;
  margin: 0.5rem;
  cursor: pointer;
`;

export default Button;
