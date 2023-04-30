import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/layouts/header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Article = styled.div`
  flex: 1;
`;

const Question = styled.div`
  flex: 2;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Bottom = styled.div`
  height: 5rem;
`;

const Title = styled.div`
  height: 2rem;
`;

const data = {
  title: '1-1 Creating Variables',
  fileName: 'script.js',
};

export default function Index() {
  const { title, fileName } = data;
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Container className="">
          <Content>
            <Article>
              <Title>{title}</Title>
              <div>left-bottom</div>
            </Article>
            <Question>
              <Title>{fileName}</Title>
              <div>right-bottom</div>
            </Question>
          </Content>
          <Bottom>bottom</Bottom>
        </Container>
      </div>
    </div>
  );
}
