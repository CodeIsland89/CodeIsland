import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import color from '../../../global/theme/color';
import header_logo from '../../../assets/header_logo.svg';
import icon from '../../../assets/icon.svg';

type Props = {
  img_url?: string,
  value?: number,
};

const StyleHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 3.4rem;
  border-bottom-width: 0.05rem;
  border-bottom-style: solid;
  border-color: ${color.grey_400};
  margin-bottom: 2rem;
  padding: 0.2rem 1rem;
  z-index: 9;
`;

const HeaderLogo = styled(Image)`
  width: 24rem;
  height: 3rem;
`;

const Icon = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const StyledValue = styled.div`
  width: 2rem;
`;

function Value({ value } : Props) {
  return (
    <StyledValue>{value}</StyledValue>
  );
}

const StyledAssets = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin-right: 0.5rem;
  }
`;

function Assets({ img_url, value } : Props) {
  return (
    <StyledAssets>
      <Icon src={img_url} alt="" />
      <Value value={value} />
    </StyledAssets>
  );
}
const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
`;

function Profile() {
  return (
    <StyledProfile>
      <Icon src={icon} alt="" />
    </StyledProfile>
  );
}

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledSidebar = styled.div`
  display: none;
  width: 10rem;
  height: 15rem;
  background-color: ${color.grey};
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover ~ ${StyledSidebar} {
    display: block;
  }
`;

function Header() {
  return (
    <StyleHeader>
      <Left>
        <HeaderLogo src={header_logo} alt="" />
      </Left>
      <Center />
      <RightContainer>
        <Right>
          <Assets img_url={icon} value={530} />
          <Assets img_url={icon} value={10} />
          <Profile />
        </Right>
        <StyledSidebar>
          Sidebar 施工中...
        </StyledSidebar>
      </RightContainer>
    </StyleHeader>
  );
}

export default Header;
