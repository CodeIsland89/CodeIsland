import React from 'react';
import BackgroundButton from '.';

export default {
  component: BackgroundButton,
  title: 'BackgroundButton',
};

type Props = {
  string: string;
};

function Template({ string } : Props) {
  return (
    <BackgroundButton>
      {string}
    </BackgroundButton>
  );
}

export const Default = Template.bind({});
Default.args = {
  string: 'button text here',
};
