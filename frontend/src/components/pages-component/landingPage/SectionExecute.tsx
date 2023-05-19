import React from 'react';
import styled from 'styled-components';
import Split from 'react-split';
import Editor from '../../shared-component/editor';
import color from '../../../global/theme/color';
import PlayIcon from '../../../assets/PlayIcon.svg';
import RestartIcon from '../../../assets/RestartIcon.svg';

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: auto;
  padding: 25px 0 100px 0;
  align-items: flex-start;
  gap: 50px;
  
  @media (max-width: 1285px) {
    width: 90%;
    padding-bottom: 25px;
    flex-wrap: wrap-reverse;
    gap: 25px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
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

`;

const SectionContent = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;  
  color: #444444;
`;

const EditorBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: #F3F3F3;
  margin: auto;
  width: 100%;
  border-radius: 5px;
  min-height: 500px;
  padding: 0 2rem;

  & > *:not(:first-child) {
    border-top: 1px solid ${color.grey_300};
  }
`;

const OperateBlock = styled.div`
  height: fit-content;
  background-color: ${color.grey_100};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid rgba(85, 85, 85, 0.5);
  * {
    height: 100%;
  }
`;

const OutputBlock = styled.div`
  flex-grow: 1;
`;

const StyledButton = styled.button`
  height: 100%;
  background-color: #fff;
  padding: 5px 20px;
  border: 0.3px solid #555555;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Splitter = styled(Split)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  margin-top: 10px;

  .gutter {
    background-color: #BAB4B4;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  
  .gutter.gutter-vertical {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
    cursor: row-resize;
  }

`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem 0;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.25rem 1rem;
`;

const OutputResultCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const OutputResultTitle = styled.h3`
  font-family: 'B612';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  margin: auto 0;
  color: rgba(238, 72, 72, 0.8);
`;

const OutputResultNumberContainer = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const OutputResultNumber = styled.p`
  font-family: 'B612';
  font-style: normal;
  font-weight: 400;
  font-size:  20px;
  color: rgba(85, 85, 85, 0.8);
`;

const OutputResultLabel = styled.span`
  font-family: 'B612';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 100%;
  color: rgba(85, 85, 85, 0.8);
`;

export default function SectionExecute() {
  const defaultCode = 'function add(a, b) {\n  return a + b;\n}';
  const onPlay = () => {
    console.log('play');
    // 將程式碼傳給後端
  };
  const onRestart = () => {
    console.log('restart');
    // 將程式碼傳給後端
  };
  return (
    <Section>
      <TextBlock>
        <SectionTitle>在線上執行你的程式</SectionTitle>
        <SectionContent>
          不用擔心環境問題，也不用安裝各種套件。
        </SectionContent>
      </TextBlock>
      <EditorBlock>
        <OperateBlock>
          {/* dropdown later */}
          <div />
          <ButtonContainer>
            <StyledButton
              onClick={onPlay}
              style={{
                borderColor: '#79A0C9',
              }}
            >
              <PlayIcon width="30px" height="30px" />
              <span style={{
                fontFamily: 'B612 Mono',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                color: '#79A0C9',
              }}
              >
                Run
              </span>
            </StyledButton>
            <StyledButton
              onClick={onRestart}
              style={{
                borderColor: '#79A0C9',
              }}
            >
              <RestartIcon width="30px" height="30px" fill="#555555" />
              <span style={{
                fontFamily: 'B612 Mono',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                color: '#79A0C9',
              }}
              >
                Reset
              </span>
            </StyledButton>
          </ButtonContainer>
        </OperateBlock>
        <Splitter
          className="vertical"
          direction="vertical"
          sizes={[60, 40]}
          minSize={10}
          expandToMin={false}
          gutterSize={20}
          gutterAlign="center"
          snapOffset={10}
          dragInterval={1}
        >
          <Editor
            defaultCode={defaultCode}
            isDarkTheme
          />
          <OutputBlock>
            <OutputResultCard>
              <OutputResultTitle>執行成功</OutputResultTitle>
              <OutputResultNumberContainer>
                <OutputResultNumber>執行時間：0.1s</OutputResultNumber>
                <OutputResultNumber>記憶體使用量：0.1KB</OutputResultNumber>
              </OutputResultNumberContainer>
            </OutputResultCard>
            <OutputResultLabel>標準輸出</OutputResultLabel>
            <Card style={{ marginTop: '15px' }}>
              <p>1</p>
              <p>2</p>
            </Card>
          </OutputBlock>
        </Splitter>
      </EditorBlock>
    </Section>
  );
}
