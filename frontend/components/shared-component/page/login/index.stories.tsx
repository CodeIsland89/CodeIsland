import React from "react";
import { TextInput, Title } from ".";

export default {
  component: { TextInput, Title },
  title: "Login",
  excludeStories: /.*Data$/,
};

export type props = {
  title: {
    text: string
  },
  textinput: {
    name: string, 
    value: string
  }
};

const Template = ( props ) => {
  return (
    <>
      <Title>Email</Title>
      <TextInput {...props.textinput} />
      <Title>Password</Title>
      <TextInput {...props.textinput} />
    </>
  )
};

export const Default = Template.bind({});
Default.props = {
  textinput: {
    name: "example_input",
    value: "text"
  },
  title: {
    text: "example"
  }
}
