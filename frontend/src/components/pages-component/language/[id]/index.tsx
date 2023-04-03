import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import color from '../../../../global/theme/color';
import UnlockIcon from '../../../../assets/test/UnlockIcon.svg';
import LockIcon from '../../../../assets/test/LockIcon.svg';

type Props = {
  isLock?: false | true;
  progress?: number;
  title?: string;
};

const circularWidth = 8; // 整體進度條大小
const circularProgressBarWidth = 1; // 進度條大小

const StyleChapter = styled.div`
  display: flex;
  height: 10rem;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const StyleCircularProgress = styled.div`
  border-radius: 999px;
  padding: 1rem;

  .circular-progress, .circular-progress-lock {
      position: relative;
      height: ${circularWidth}rem;
      width: ${circularWidth}rem;
      border-radius: 50%;
      background: conic-gradient(${color.yellow_600} 0deg, ${color.grey_300} 0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      
      & > * {
        z-index: 1; 
      }
  }
  .circular-progress::before {
      content: "";
      position: absolute;
      height: ${circularWidth - circularProgressBarWidth}rem;
      width: ${circularWidth - circularProgressBarWidth}rem;
      border-radius: 50%;
      background-color: ${color.grey_100};
  }

  .circular-progress-image {
    height: 5rem;
    width: 5rem;
  }
`;

function CircularProgress({ progress } : Props) {
  return (
    <StyleCircularProgress>
      <div
        className="circular-progress"
        style={{ background: `conic-gradient(${color.yellow_600} ${progress * 3.6}deg, ${color.grey_300} 0deg)` }}
      >
        <Image alt="" src={UnlockIcon} width={1} height={1} className="circular-progress-image" priority />
      </div>
    </StyleCircularProgress>
  );
}

function LockCircularProgress() {
  return (
    <StyleCircularProgress>
      <div
        className="circular-progress-lock"
      >
        <Image alt="" src={LockIcon} width={1} height={1} className="circular-progress-image" priority />
      </div>
    </StyleCircularProgress>
  );
}

const StyleChapterContent = styled.div`
  position: relative;
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.4rem;
`;

function ChapterContent({ title } : Props) {
  return (
    <StyleChapterContent>
      {title}
    </StyleChapterContent>
  );
}

function Chapter({ progress = 0, isLock, title } : Props) {
  return (
    <StyleChapter>
      {isLock ? <LockCircularProgress /> : <CircularProgress progress={progress} />}
      <ChapterContent title={title} />
    </StyleChapter>
  );
}

const StyleChapters = styled.div`
  margin: 0 8rem;
  & > *:not(:first-child) {
    border-top: 0.05rem solid ${color.grey_400};
  }
`;

function Chapters() {
  return (
    <StyleChapters>
      <Chapter progress={33} title="JavaScript Basic" />
      <Chapter isLock title="Fundamentals" />
      <Chapter isLock title="Fundamentals" />
      <Chapter isLock title="Fundamentals" />
      <Chapter isLock title="Fundamentals" />
    </StyleChapters>
  );
}

export default Chapters;
