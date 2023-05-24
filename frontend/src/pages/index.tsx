import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import SectionWelecome from '../components/pages-component/landingPage/SectionWelcome';
import SectionProvide from '../components/pages-component/landingPage/SectionProvide';
import SectionUnLimited from '../components/pages-component/landingPage/SectionUnLimited';
import SectionExecute from '../components/pages-component/landingPage/SectionExecute';
import Footer from '../components/pages-component/landingPage/Footer';

const PageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Index() {
  return (
    <>
      <Head>
        <title>
          CodeIsland - Your best partner in programming
        </title>
        <meta
          name="description"
          content="CodeIsland is a platform that helps you to learn programming in a fun way."
          key="desc"
        />
      </Head>
      <PageContainer>
        <SectionWelecome />
        <SectionProvide />
        <SectionUnLimited />
        <SectionExecute />
        <Footer />
      </PageContainer>

    </>
  );
}
