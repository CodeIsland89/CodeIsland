import React from 'react';
import styled from 'styled-components';
import ComputerSVG from '../../../assets/Computer.svg';

const StyledSection = styled.section`
  width: 100vw;
  background: linear-gradient(360deg, #738DC0 0%, #506FAC 31.03%, #31408B 100%);
  padding: 25px 0 100px 0;

  @media (max-width: 768px) {
    padding: 25px 0 50px 0;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 20px 15% 5% 15%;

  @media (max-width: 768px) {
    padding: 0 5%;
  }

`;

const StyledLogoText = styled.span`
  font-family: 'B612 Mono';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  color: #FFFFFF;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const StyledHrefSection = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const StyledHomeSectionLink = styled.button`
  text-decoration: none;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StyledTrySectionLink = styled.button`
  text-decoration: none;
  font-family: 'B612';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: #425E9E;
  background: #FFFFFF;
  border-radius: 50px;
  padding: 5px 40px;
  cursor: pointer;
  border: none;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 4px 30px;
  }

`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 90%;
  }

`;

const MainContentLeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 2;
  flex-basis: 500px;
`;

const SectionTitleWelcome = styled.h1`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 48px;
  color: #FFFFFF;
  text-align: center;
  transform: translateX(-60px);
  width: 100%;

  @media (max-width: 768px) {
    font-size: 36px;
  }

`;

const SectionTitleCodeIsland = styled.h1`
  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 48px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
  transform: translateX(60px);
  width: 100%;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const StyledLoginButton = styled.button` // 之後要改成Link 連到真的登入頁面
  padding: 5px 40px;
  gap: 10px;
  background: #FFFFFF;
  border-radius: 50px;
  font-family: 'B612';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: #425E9E;
  margin: auto;
  margin-top: 50px;
  border: none;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 26px;
    padding: 4px 40px;
    margin-top: 25px;
    margin-bottom: 25px;
  }

`;

const StyledComputerSVG = styled(ComputerSVG)`
  margin: auto;
  max-height: 400px;
  max-width: 400px;
`;

export default function SectionWelecome() {
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StyledSection id="welcome-section">
      <StyledHeader>
        <StyledLogoText>
          Code Island
        </StyledLogoText>
        <StyledHrefSection>
          <StyledHomeSectionLink onClick={() => scrollToSection('welcome-section')}>
            首頁
          </StyledHomeSectionLink>
          <StyledTrySectionLink onClick={() => scrollToSection('execute-section')}>
            試試看
          </StyledTrySectionLink>
        </StyledHrefSection>
      </StyledHeader>
      <MainContent>
        <MainContentLeftBlock>
          <SectionTitleWelcome>歡迎來到</SectionTitleWelcome>
          <SectionTitleCodeIsland>CodeIsland</SectionTitleCodeIsland>
          <StyledLoginButton type="button">
            登入
          </StyledLoginButton>
        </MainContentLeftBlock>
        <StyledComputerSVG />
      </MainContent>
    </StyledSection>
  );
}
