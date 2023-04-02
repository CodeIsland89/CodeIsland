import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import color from '../../../global/theme/color';
import header_logo from '../../../assets/Code Island.svg';
import sidebar_profile_icon from '../../../assets/arcticons_curiouscat.svg';
import sidebar_setting_icon from '../../../assets/material-symbols_settings-outline-rounded.svg';
import sidebar_logout_icon from '../../../assets/ic_outline-log-out.svg';
import fish_icon from '../../../assets/icon-park-solid_fish-one.svg';
import paw_icon from '../../../assets/openmoji_paw-prints.svg';
import profile_icon from '../../../assets/Group 20.svg';
import useMountEffect from '../../../hook/useMountEffect';

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
  height: 2.5rem;
  border-bottom-width: 0.05rem;
  border-bottom-style: solid;
  border-color: ${color.grey_400};
  margin-bottom: 2rem;
`;

const HeaderLogo = styled(Image)`
  width: 12rem;
  height: 1.5rem;
`;

const Icon = styled(Image)`
  width: 2rem;
  height: 2rem;
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
      <Icon src={img_url} alt="" priority />
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
      <Icon src={profile_icon} alt="" priority />
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
      <SidebarIcon src={icon_src} alt="" priority />
      <span>{text}</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <StyledSidebar>
      <Item href="/profile" icon_src={sidebar_profile_icon} text="Profile" />
      <Item href="/setting" icon_src={sidebar_setting_icon} text="Setting" />
      <Item href="/logout" icon_src={sidebar_logout_icon} text="Log Out" />
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  useMountEffect(handleLoaded);

  // 預載入動畫
  return (
    <div style={{ display: isLoaded ? 'block' : 'none' }}>
      <StyleHeader>
        <Left>
          <HeaderLogo src={header_logo} alt="" priority />
        </Left>
        <Center />
        <RightContainer>
          <Right>
            <Assets img_url={fish_icon} value={530} />
            <Assets img_url={paw_icon} value={10} />
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
    </div>
  );
}

export default Header;
