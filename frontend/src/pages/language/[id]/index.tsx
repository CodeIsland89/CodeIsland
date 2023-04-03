import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../../../components/layouts/header';
import Chapters from '../../../components/pages-component/language/[id]';
import useMountEffect from '../../../hook/useMountEffect';

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  useMountEffect(handleLoaded);

  return (
    <div style={{ display: isLoaded ? 'block' : 'none' }}>
      <Header />
      <Image alt="" src="" priority />
      <Chapters />
    </div>
  );
}
