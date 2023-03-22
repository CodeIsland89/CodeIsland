import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
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
`;

const HeaderLogo = styled(Image)`
  width: 24rem;
  height: 3rem;
`;

const Icon = styled(Image)`
  width: 3rem;
  height: 3rem;
`;

const SidebarIcon = styled(Image)`
  width: 1.2rem;
  height: 1.2rem;
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
  position: relative;
  // display: none;
  width: 10rem;
  height: 100%;
  padding: 0.8rem;
  background-color: ${color.white};
  border: 0.02rem solid ${color.grey_400};
  border-bottom-left-radius: 0.2rem;
  

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    color: ${color.black};
    text-decoration: none;
  }

  .item > *:nth-child(even) {
    margin-left: 0.5rem;
  }

  & > * {
    background-color: ${color.white};
    box-sizing: border-box;
    width: 100%;
    padding: 0.6rem;
  }

  & > *:nth-child(even) {
    border: 0px solid ${color.grey_400};
    border-top-width: 0.05rem;
  }

  & > *:last-child {
    margin-top: 2rem;
  }
`;

type ItemProps = {
  href: string,
  icon_src: string,
  text: string,
};

function Item({ href, icon_src, text } : ItemProps) {
  return (
    <Link href={href} className="item">
      <SidebarIcon src={icon_src} alt="" />
      <span>{text}</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <StyledSidebar>
      <Item href="/profile" icon_src={icon} text="Profile" />
      <Item href="/setting" icon_src={icon} text="Setting" />
      <Item href="/logout" icon_src={icon} text="Log Out" />
    </StyledSidebar>
  );
}

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 1rem;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 1rem;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 1rem;
  &:hover ~ ${StyledSidebar} {
    display: block;
  }
`;

function Header() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
          <div
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
          >
            <Profile />
          </div>
        </Right>
        {isHovering
        && <Sidebar />}
      </RightContainer>
    </StyleHeader>
  );
}

export default Header;
