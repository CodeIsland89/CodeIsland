import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import color from '../../../global/theme/color';
import HeaderLogoSVG from '../../../assets/Code Island.svg';
import SidebarProfileIcon from '../../../assets/arcticons_curiouscat.svg';
import SidebarSettingIcon from '../../../assets/material-symbols_settings-outline-rounded.svg';
import SidebarLogoutIcon from '../../../assets/ic_outline-log-out.svg';
import FishIcon from '../../../assets/icon-park-solid_fish-one.svg';
import paw_icon from '../../../assets/openmoji_paw-prints.svg';
import ProfileIcon from '../../../assets/Group 20.svg';

type Props = {
  PropImage: React.FunctionComponent<React.SVGAttributes<SVGElement>>,
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

const HeaderLogo = styled(HeaderLogoSVG)`
  width: fit-content;
  height: fit-content;
`;

const StyledValue = styled.div`
  width: 2rem;
`;

const StyledAssets = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  & > * {
    margin-right: 0.5rem;
  }
`;

function Assets({ PropImage, value } : Props) {
  return (
    <StyledAssets>
      <PropImage
        viewBox="0 0 50 50"
        style={{
          margin: 0,
          padding: 0,
          width: '2rem',
          height: '2rem',
        }}
      />
      <StyledValue>{value}</StyledValue>
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
      <ProfileIcon />
    </StyledProfile>
  );
}

const RightContainer = styled.div`
  position: relative;
  height: 100%;
`;

const StyledSidebar = styled.div`
  position: absolute;
  width: 10rem;
  height: fit-content;
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
  IconSVG: React.FunctionComponent<React.SVGAttributes<SVGElement>>,
  text: string,
};

function Item({ href, IconSVG, text } : ItemProps) {
  return (
    <Link href={href} className="item">
      <IconSVG />
      <span>{text}</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <StyledSidebar>
      <Item href="/profile" IconSVG={SidebarProfileIcon} text="Profile" />
      <Item href="/setting" IconSVG={SidebarSettingIcon} text="Setting" />
      <Item href="/logout" IconSVG={SidebarLogoutIcon} text="Log Out" />
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
  padding: 0 1rem;
  height: 100%;
`;

function Header() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // 預載入動畫
  return (
    <div>
      <StyleHeader>
        <Left>
          <HeaderLogo />
        </Left>
        <Center />
        <RightContainer>
          <Right>
            <Assets PropImage={FishIcon} value={530} />
            <Assets PropImage={paw_icon} value={10} />
            <div
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseOut}
            >
              <Profile />
            </div>
          </Right>
          {isHovering && <Sidebar />}
        </RightContainer>
      </StyleHeader>
    </div>
  );
}

export default Header;
