import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Header from '../../../components/layouts/header';
import Chapters from '../../../components/pages-component/language/[id]';
import FrontCover from '../../../assets/test/frontCover.svg';
import color from '../../../global/theme/color';
import Back from '../../../assets/Back.svg';

const BackButton = styled(Link)`
  color: ${color.white};
  text-decoration: none;
  position: absolute;
  top: 5rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
`;

export default function Index() {
  return (
    <div>
      <BackButton href="/language">
        <Back />
      </BackButton>
      <Header />
      <FrontCover />
      <Chapters />
    </div>
  );
}
