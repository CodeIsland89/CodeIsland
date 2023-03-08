import styled from 'styled-components';
import color from '../../../../theme/color';

const Input = styled.input`
  --m: 0.5rem;
  width: calc(100% - var(--m));
  margin: var(--m) 0 0 var(--m);
  height: 1.5rem;
  background-color: transparent;
  border-width: 0 0 0.05rem 0;
  border-color: ${color.blue_800};

  &:focus {
    outline: none;
  }
`;

export default Input;
