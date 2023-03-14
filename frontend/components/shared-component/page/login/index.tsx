import styled from 'styled-components';

const TextInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  height: 1.2rem;
  border-color: #7EA2C3;
  border-width: 0.075rem;
  border-style: none none solid;
  &:focus {
    outline: none;
  }
`;

export { TextInput };

const Title = styled.h2`
  font-size: 1.5rem;
  color: #3866AB;
  margin: 0.5rem 0 0 0;
`;

export { Title };