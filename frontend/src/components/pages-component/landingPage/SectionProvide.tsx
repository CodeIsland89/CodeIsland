import React from 'react';
import styled from 'styled-components';
import SVG from '../../../assets/LandingPageCatDesign.svg';

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
  flex-wrap: wrap-reverse;
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

const StyledSVG = styled(SVG)`
  margin: auto;
  max-height: 400px;
  max-width: 400px;
  
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

export default function SectionProvide() {
  return (
    <Section>
      <TextBlock>
        <SectionTitle>提供各種語言的學習環境</SectionTitle>
        <SectionContent>
          包含了各種語言的教學，只要有心想學習
          那麼我們的網站一定是你學習Coding的好地方。
        </SectionContent>
      </TextBlock>
      <StyledSVG />
    </Section>
  );
}
