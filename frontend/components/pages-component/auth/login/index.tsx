import React from 'react';
import styled from 'styled-components';
import Box from '../../../shared-component/box';
import Text from '../../../shared-component/text';
import color from '../../../../theme/color';
import Input from '../../../shared-component/textinput/textinput';

type Props = {
  text?: string,
  name?: string,
  type?: 'password',
};

function InputRow({ text, name, type }: Props) {
  return (
    <Box style={{ width: '100%' }}>
      <Text color={color.blue_900} fontSize="1.2rem">{text}</Text>
      <Input name={name} type={type || 'text'} />
    </Box>
  );
}

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 12rem;
  height: 2rem;
  background-color: transparent;
  padding: 0.25rem 1rem;
  color: ${color.grey_600};
  border: ${color.grey_600} 0.05rem solid;
  border-radius: 99rem;
`;

const Card = styled.div`
  background-color: ${color.white};
  width: fit-content;
  border-radius: 0.5rem;
  padding: 2rem;
`;

export { InputRow, GoogleButton, Card };
