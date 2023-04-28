import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Header from '../../../components/layouts/header';
import Back from '../../../assets/Back.svg';
import { ContentsContainer, LessonCard, LessonCardContainer } from '../../../components/pages-component/chapter/[id]';
import color from '../../../global/theme/color';

const BackButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: row;
  top: 5rem;
  left: 1rem;
  width: fit-content;
  height: fit-content;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer; 
`;

const BackIcon = styled(Back)`
  width: 3rem;
  height: 3rem;
  filter: invert(0.4);

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const BackText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: ${color.grey_700};

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 29px;
  }
`;

const testSet = [
  {
    lessonId: 1,
    quizId: 1,
    title: 'Hello World',
    isUnlocked: true,
  },
  {
    lessonId: 2,
    quizId: 2,
    title: 'Variables',
    isUnlocked: true,
  },
  {
    lessonId: 3,
    quizId: 3,
    title: 'Data Types',
    isUnlocked: false,
  },
];

export default function ChapterPage() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <BackButton onClick={() => router.back()}>
        <BackIcon fill="#000000" />
        <BackText>JavaScript Basics</BackText>
      </BackButton>
      <ContentsContainer>
        <LessonCardContainer>
          {testSet.map((test) => (
            <LessonCard
              key={test.lessonId}
              lessonId={test.lessonId}
              quizId={test.quizId}
              title={test.title}
              isUnlocked={test.isUnlocked}
            />
          ))}
        </LessonCardContainer>
      </ContentsContainer>
    </div>
  );
}
