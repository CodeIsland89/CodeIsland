import React from 'react';
import Header from '../../../components/layouts/header';
import Chapters from '../../../components/pages-component/language/[id]';
import FrontCover from '../../../assets/test/frontCover.svg';

export default function Index() {
  return (
    <div>
      <Header />
      <FrontCover />
      <Chapters />
    </div>
  );
}
