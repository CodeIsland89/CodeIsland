import styled from 'styled-components';

const TextInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  height: 1.2rem;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 0.075rem;
  border-style: none none solid;
  &:focus {
    outline: none;
  }
`;

export default TextInput;
