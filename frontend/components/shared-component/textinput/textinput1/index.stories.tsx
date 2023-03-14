import React from "react";
import TextInput from ".";

export default {
  component: TextInput,
  title: "Textinput1",
  excludeStories: /.*Data$/,
};

export type Props = {
  name: string;
  value: string;
};

const Template = (args: Props) => {
  return (
    <TextInput {...args} />
  )
};

export const Default = Template.bind({});
Default.args = {
  name: "example_input",
  value: "text"
}
