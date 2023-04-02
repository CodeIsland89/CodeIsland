import React from 'react';
import styled from 'styled-components';
import Box from '../../../shared-component/box';
import Text from '../../../shared-component/text';
import color from '../../../../global/theme/color';
import Input from '../../../shared-component/textinput/textinput';
import Button from '../../../shared-component/button';

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
  cursor: pointer;
`;

const MemberButton = styled(Button)`
  background-color: ${color.blue_400};
  color: ${color.white};
  font-weight: bold;
  width: 10rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  border-width: 0rem;
  cursor: pointer;
`;

const Card = styled.div`
  background-color: ${color.white};
  width: fit-content;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const Block = styled(Box)`
  min-width: 280px;
  min-height: 20px;
  width: 25vw;
  margin: 0 2rem;
  & > * {
    width: 100%;
    margin: 1.5rem 0 0 0;
  }
`;

export {
  InputRow, GoogleButton, Card, MemberButton, Block,
};
