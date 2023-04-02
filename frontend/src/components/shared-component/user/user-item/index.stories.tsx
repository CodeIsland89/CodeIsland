import React from 'react';
import UserItem, { UsertProps } from '.';

export default {
  component: UserItem,
  title: 'UserItem',
  excludeStories: /.*Data$/,
  argTypes: {
    id: {
      control: {
        type: 'number',
      },
    },
    name: {
      control: {
        type: 'text',
      },
    },
    email: {
      control: {
        type: 'text',
      },
    },
  },
};

function Template(args: UsertProps) {
  return <UserItem user={{ ...args }} />;
}

export const Default = Template.bind({});
Default.args = {
  id: 1,
  name: 'my name here',
  email: 'random@email.com',
};
