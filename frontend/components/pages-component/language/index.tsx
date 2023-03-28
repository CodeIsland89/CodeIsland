import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import color from '../../../global/theme/color';
import ProgressBar from '../../shared-component/progress_bar';

type Props = {
  img_url?: string,
  content: {
    title: string,
    text: string,
    value: number,
    max: number,
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

const Container = styled(Link)`
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
  // background-color: ${color.grey_500};
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

const useMountEffect = (fun) => useEffect(fun, [fun]);

function LanguageBlock({ img_url, content }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const handleLoading = () => {
    setIsLoading(true);
  };

  useMountEffect(handleLoading);

  // 預載入動畫
  return (
    <div style={{ display: isLoading ? 'block' : 'none' }}>
      <Container href={`${currentPath}/${content.title}`}>
        <StyledImage src={img_url} alt="" priority />
        <Content>
          <Title>{content.title}</Title>
          <Text>{content.text}</Text>
          <ProgressBar value={content.value} max={content.max} />
        </Content>
      </Container>
    </div>
  );
}

export {
  LanguageBlock, Image, Main,
};
