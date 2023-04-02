import React from 'react';
import { TextInput, Title } from '.';

export default {
  component: { TextInput, Title },
  title: 'Login',
  excludeStories: /.*Data$/,
};

export type Props = {
  title: {
    text: string
  },
  textinput: {
    name: string,
    value: string
  }
};

function Template({ textinput } : Props) {
  return (
    <>
      <Title>Email</Title>
      <TextInput {...textinput} />
      <Title>Password</Title>
      <TextInput {...textinput} />
    </>
  );
}

export const Default = Template.bind({});
Default.props = {
  textinput: {
    name: 'example_input',
    value: 'text',
  },
  title: {
    text: 'example',
  },
};
