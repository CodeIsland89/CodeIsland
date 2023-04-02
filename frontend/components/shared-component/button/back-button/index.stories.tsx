import React from 'react';
import BackButton from '.';

export default {
  component: BackButton,
  title: 'BackButton',
};

type Props = {
  string: string;
  href: string;
};

function Template({ href, string } : Props) {
  return (
    <BackButton href={href}>
      {string}
    </BackButton>
  );
}

export const Default = Template.bind({});
Default.args = {
  string: 'button text here',
  href: '/',
};
