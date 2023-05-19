import React from 'react';
import styled from 'styled-components';
import SectionWelecome from '../components/pages-component/landingPage/SectionWelcome';
import SectionProvide from '../components/pages-component/landingPage/SectionProvide';
import SectionUnLimited from '../components/pages-component/landingPage/SectionUnLimited';
import SectionExecute from '../components/pages-component/landingPage/SectionExecute';

const PageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Index() {
  return (
    <PageContainer>
      <SectionWelecome />
      <SectionProvide />
      <SectionUnLimited />
      <SectionExecute />
    </PageContainer>
  );
}
