import React from 'react';
import styled from 'styled-components';
import SVG from '../../../assets/Man-programmer.svg';

const Section = styled.section`
    width: 100%;
    background-color: #F5F8FF;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
  flex-wrap: wrap;
  padding: 25px 0 100px 0;

  @media (max-width: 768px) {
    width: 90%;
    padding-bottom: 25px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: auto;
  flex-basis: 500px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #444444;

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const SectionContent = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;  
  color: #444444;

  @media (max-width: 500px) {
    font-size: 20px;
  }

`;

const StyledSVG = styled(SVG)`
  margin: auto;
  max-height: 400px;
  max-width: 600px;

  @media (max-width: 768px) {
    max-height: 300px;
    max-width: 600px;
  }
`;

export default function SectionUnLimited() {
  return (
    <Section>
      <StyledWrapper>
        <TextBlock>
          <SectionTitle>這裡不會限制你的想像力</SectionTitle>
          <SectionContent>
            我們不會限制你的解法
            只要您的輸出答案與預期相符就好
          </SectionContent>
        </TextBlock>
        <StyledSVG />
      </StyledWrapper>
    </Section>
  );
}
