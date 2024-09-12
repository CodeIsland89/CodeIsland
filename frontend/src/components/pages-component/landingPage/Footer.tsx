import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100vw;
  height: 100px;
  background-color: #40579B;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
  
`;

const StyledCodeIslandSpan = styled.span`
  font-family: 'B612 Mono';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`;

const StyledCopyrightSpan = styled.span`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <StyledCodeIslandSpan>
        Code Island
      </StyledCodeIslandSpan>
      <StyledCopyrightSpan>
        © 2023 Team CodeIsland All rights reserved
      </StyledCopyrightSpan>
    </StyledFooter>
  );
}
