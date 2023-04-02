import React, { useState } from 'react';
import { LanguageBlock, Main } from '../../components/pages-component/language';
import Header from '../../components/layouts/header';
import img_language from '../../assets/test/language.svg';
import useMountEffect from '../../hook/useMountEffect';

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const languageList = [{
    content: {
      title: 'JavaScript',
      text: '開始...',
      value: 10,
      max: 19,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'Python',
      text: '開始...',
      value: 10,
      max: 21,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'C++',
      text: '開始...',
      value: 10,
      max: 88,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'Java',
      text: '開始...',
      value: 10,
      max: 13,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'PHP',
      text: '開始...',
      value: 10,
      max: 20,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }];

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  useMountEffect(handleLoaded);

  return (
    <div style={{ display: isLoaded ? 'block' : 'none' }}>
      <Header />
      <Main>
        {languageList.map((data) => (
          <LanguageBlock img_url={img_language} content={data.content} />
        ))}
      </Main>
    </div>
  );
}
