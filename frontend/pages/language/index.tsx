import React from 'react';
import { LanguageBlock, Main } from '../../components/pages-component/language';
import Header from '../../components/shared-component/header';
import img_language from '../../assets/language.svg';

export default function Index() {
  const languageList = [{
    content: {
      title: 'JavaScript',
      text: '開始...',
      process: 0.5,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'Python',
      text: '開始...',
      process: 0.5,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'C++',
      text: '開始...',
      process: 0.5,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'Java',
      text: '開始...',
      process: 0.5,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }, {
    content: {
      title: 'PHP',
      text: '開始...',
      process: 0.5,
    },
    img_url: 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png',
  }];

  return (
    <>
      <Header />
      <Main>
        {languageList.map((data) => (
          <LanguageBlock img_url={img_language} content={data.content} />
        ))}
      </Main>
    </>
  );
}
