import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import color from '../../../../global/theme/color';
import JavascriptIcon from '../../../../assets/JavascriptIcon.svg';

const ContentsContainer = styled.div`
  position: relative;
  top: 10rem;
`;

const LessonCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  width: 80%;
  margin: auto;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

type StyledComponentIsUnlockedProps = {
  isunlocked: boolean;
};

const StyledLessonCard = styled.div<StyledComponentIsUnlockedProps>`
  color: ${color.black};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25rem;
  height: 9rem;
  border-radius: 0.2rem;
  padding: 1rem;
  box-shadow: 0.2rem 0.2rem 0.4rem ${color.grey_400};
  transition: all 0.2s ease-in 0s;
  margin: auto;
  &:hover,
  &:focus {
    box-shadow: 0.2rem 0.2rem 0.4rem ${color.grey_800};
    transition: all 0.2s ease-in;
  }
  background-color: ${(props) => (props.isunlocked ? color.white : color.grey_200)};
`;

const StyledLessonCardIcon = styled(JavascriptIcon)<StyledComponentIsUnlockedProps>`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  filter: grayscale(${(props) => (props.isunlocked ? 0 : 1)});
`;

const StyledLessonCardTitle = styled.span<StyledComponentIsUnlockedProps>`
  width: 372px;
  height: 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => (props.isunlocked ? color.black : color.grey_400)};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: auto;
`;

const StyledButton = styled(Link)<StyledComponentIsUnlockedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 1rem;
  width: 5rem;
  height: 2rem;
  border: 0.5px solid ${(props) => (props.isunlocked ? props.color : color.grey_400)};
  border-radius: 5px;
  text-decoration: none;
  color: ${(props) => (props.isunlocked ? props.color : color.grey_400)};
  transition: all 0.2s ease-in;

  ${(props) => (props.isunlocked && `&:hover {
    outline: 1px double ${props.color};
    }`
  )}
`;

type LessonCardProps = {
  lessonId: number;
  quizId: number;
  title: string;
  isUnlocked: boolean;
};

function LessonCard({
  lessonId, quizId, title, isUnlocked,
}: LessonCardProps) {
  return (
    <StyledLessonCard isunlocked={isUnlocked}>
      <StyledLessonCardIcon isunlocked={isUnlocked} />
      <StyledLessonCardTitle isunlocked={isUnlocked}>
        {title}
      </StyledLessonCardTitle>
      <StyledButtonContainer>
        <StyledButton
          href={`/review/${lessonId}`}
          color={color.lessonReviewButton}
          isunlocked={isUnlocked}
          as={isUnlocked ? Link : 'div'}
        >
          Review
        </StyledButton>
        <StyledButton
          href={`/quiz/${quizId}`}
          color={color.lessonQuizButton}
          isunlocked={isUnlocked}
          as={isUnlocked ? Link : 'div'}
        >
          Quiz
        </StyledButton>
      </StyledButtonContainer>
    </StyledLessonCard>
  );
}

export {
  ContentsContainer,
  LessonCardContainer,
  LessonCard,
};
