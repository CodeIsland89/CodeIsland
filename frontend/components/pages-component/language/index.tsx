import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import color from '../../../global/theme/color';

type Props = {
  img_url?: string,
  content: {
    title: string,
    text: string,
    process: number,
  },
};

const Main = styled.div`
  box-sizing: border-box;
  --my: 1rem;
  --mx: 4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: calc(100% - 2 * var(--mx));
  height: calc(100% - 2 * var(--my));
  margin: var(--my) calc(var(--mx));
`;

const Container = styled.a`
  color: ${color.black};
  text-decoration: none;

  display: flex;
  flex-direction: row;
  width: 30rem;
  height: 9rem;
  margin: 2rem 0;
  border-radius: 0.2rem;
  box-shadow: 0.2rem 0.2rem 0.4rem ${color.grey_400};
  transition: all 0.2s ease-in 0s;
  &:hover,
  &:focus {
    box-shadow: 0.2rem 0.2rem 0.4rem ${color.grey_800};
    transition: all 0.2s ease-in;
  }
`;

const StyledImage = styled(Image)`
  width: 12rem;
  height: 9rem;
  background-color: ${color.grey_500};
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  height: 100%;
  padding: 0.5rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem;
`;

const Text = styled.div`
  flex-grow: 1;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${color.grey_800};
`;

const Process = styled.div`
  background-color: ${color.grey_300};
`;

function LanguageBlock({ img_url, content }: Props) {
  return (
    <Container href={content.title}>
      <StyledImage src={img_url} alt="" />
      <Content>
        <Title>{content.title}</Title>
        <Text>{content.text}</Text>
        <Process>
          {content.process * 100}
          % 進度條施工中...
        </Process>
      </Content>
    </Container>
  );
}

export {
  LanguageBlock, Image, Main,
};
