import React from 'react';
import { LanguageBlock, Image, Main } from '../../components/pages-component/language';
import Header from '../../components/shared-component/header';

export default function Index() {
  const languageList = ['JavaScript', 'Python', 'C++', 'Java', 'PHP', '', ''];

  return (
    <>
      <Header>123</Header>
      <Main>
        {languageList.map((language) => (
          <LanguageBlock>
            {language}
            <Image />
          </LanguageBlock>
        ))}
      </Main>
    </>
  );
}
