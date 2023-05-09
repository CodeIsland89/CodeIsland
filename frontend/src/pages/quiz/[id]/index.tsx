/* eslint-disable react/no-children-prop */
import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Editor from '../../../components/shared-component/editor';
import Header from '../../../components/layouts/header';
import color from '../../../global/theme/color';
import PrevIcon from '../../../assets/PrevIcon.svg';
import NextIcon from '../../../assets/NextIcon.svg';
import PlayIcon from '../../../assets/PlayIcon.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  & > *:not(:first-child) {
    border-top: 1px solid ${color.grey_300};
  }
`;

const Article = styled.div`
  flex: 1;
`;

const Question = styled.div`
  flex: 2;
  display: flex;
  flex-flow: column;
  & > *:not(:first-child) {
    border-top: 1px solid ${color.grey_300};
  }
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  & > *:not(:first-child) {
    border-left: 1px solid ${color.grey_300};
  }
`;

const Bottom = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const Title = styled.div`
  height: 2rem;
  background-color: ${color.grey_100};
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const ArticleContent = styled(ReactMarkdown)`
  padding-left: 2rem;
  padding-right: 1rem;
  text-align: justify;
  text-justify: auto; // for IE
`;

const Output = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;

const Prev = styled(Link)`
`;

const Next = styled(Link)`

`;

const data = {
  title: '1-1 Creating Variables',
};

const BackButton = styled(Link)`
  color: ${color.white};
  text-decoration: none;
`;

const StyledPlayButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`;

function PlayButton() {
  const onPlay = () => {
    console.log('play');
    // 將程式碼傳給後端
  };

  return (
    <StyledPlayButton onClick={onPlay}>
      <PlayIcon />
    </StyledPlayButton>
  );
}

export default function Index() {
  const { title } = data;
  const source = `
  ## 1-1-1 Var用途
  var 宣告是全局作用域或函式作用域，而且var 變數可以在其範圍内更新和重新宣告!\n
  什麼是全局作用網&函式作用域？

  兩者是JavaScript中的兩種作用域類型。\n
  全局作用域是指在代碼中任何地方都能夠訪問的變數或函數。这些變數或函數在程序開始執行時就被宣告，並且一直存在于程序的整个生命週期中。

  函數作用域是指在函數内部宣告的變數或函數，只能在函數内部訪問。當函數執行完畢後，這些變數和函數將被銷毀。
  `;

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Container className="">
          <Box>
            <Article>
              <Title>
                <BackButton href="/quiz">
                  <PrevIcon />
                </BackButton>
                {title}
              </Title>
              <ArticleContent children={source} />
            </Article>
            <Question>
              <Title style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>
                <div />
                <PlayButton />
              </Title>
              <Editor />
              {/* 用途不明 */}
              <div style={{ height: '1.5rem' }} />
              <Output>Output</Output>
            </Question>
          </Box>
          <Bottom>
            <Prev href="."><PrevIcon /></Prev>
            <div style={{ fontSize: '1.2rem' }}>1/?</div>
            <Next href="."><NextIcon /></Next>
          </Bottom>
        </Container>
      </div>
    </div>
  );
}
