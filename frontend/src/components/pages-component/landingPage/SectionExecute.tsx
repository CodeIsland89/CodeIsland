import React, { useState } from 'react';
import styled from 'styled-components';
import Split from 'react-split';
import Editor from '../../shared-component/editor';
import color from '../../../global/theme/color';
import PlayIcon from '../../../assets/PlayIcon.svg';
import RestartIcon from '../../../assets/RestartIcon.svg';
import Select from '../../shared-component/select';
import quickJudgeService, { QuickJudgeResult } from '../../../service/quickJudge.service';

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
  padding: 2rem 2rem;

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
  flex-wrap: wrap;
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
  height: inherit;
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

const IconLabel = styled.span`
  font-family: 'B612 Mono';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #79A0C9;
`;

type LanguageItem = {
  languageName: string;
  judge_id: number;
  default_code: string;
};

const LANGUAGE_LIST: LanguageItem[] = [
  {
    languageName: 'JavaScript',
    judge_id: 63,
    default_code: 'console.log("Hello World")',
  },
  {
    languageName: 'Python',
    judge_id: 70,
    default_code: 'print("Hello World")',
  },
  {
    languageName: 'PHP',
    judge_id: 68,
    default_code: 'echo "Hello World"',
  },
  {
    languageName: 'Java',
    judge_id: 62,
    default_code: 'System.out.println("Hello World")',
  },
  {
    languageName: 'C',
    judge_id: 50,
    default_code: '#include <stdio.h>\nint main() {\n  printf("Hello World");\n  return 0;\n}',
  },
];

export default function SectionExecute() {
  const [code, setCode] = useState('console.log("hello world")');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem>(LANGUAGE_LIST[0]);
  const [executeStatus, setExecuteStatus] = useState<QuickJudgeResult>({
    message: '執行成功',
    data: {
      stdout: 'Hello World',
      stderr: '',
      time: 0,
      memory: 0,
    },
    error: '',
  });

  const onPlay = async () => {
    const data = await quickJudgeService(code, selectedLanguage.judge_id);
    setExecuteStatus(data);
  };

  const onReset = () => {
    setCode(selectedLanguage.default_code);
  };

  const selectProps = LANGUAGE_LIST.map((item) => ({
    label: item.languageName,
    value: String(item.judge_id),
  }));

  const onLanguageChange = (value: string) => {
    const selected = LANGUAGE_LIST.find((item) => String(item.judge_id) === value);
    if (selected) {
      setSelectedLanguage(selected);
      setCode(selected.default_code);
    }
  };

  return (
    <Section id="execute-section">
      <TextBlock>
        <SectionTitle>在線上執行你的程式</SectionTitle>
        <SectionContent>
          不用擔心環境問題，也不用安裝各種套件。
        </SectionContent>
      </TextBlock>
      <EditorBlock>
        <OperateBlock>
          <Select items={selectProps} onChange={onLanguageChange} />
          <ButtonContainer>
            <StyledButton
              onClick={onPlay}
              style={{
                borderColor: '#79A0C9',
              }}
            >
              <PlayIcon width="30px" height="30px" />
              <IconLabel>
                Run
              </IconLabel>
            </StyledButton>
            <StyledButton
              onClick={onReset}
              style={{
                borderColor: '#79A0C9',
              }}
            >
              <RestartIcon width="30px" height="30px" fill="#555555" />
              <IconLabel>
                Reset
              </IconLabel>
            </StyledButton>
          </ButtonContainer>
        </OperateBlock>
        <div style={{ height: '15rem' }}>
          <Splitter
            className="vertical"
            direction="vertical"
            sizes={[60, 40]}
            minSize={50}
            expandToMin={false}
            gutterSize={20}
            gutterAlign="center"
            snapOffset={10}
            dragInterval={1}
          >
            <Editor
              code={code}
              setCode={setCode}
              defaultCode={selectedLanguage.default_code}
              isDarkTheme
            />
            <div>
              <OutputBlock>
                <OutputResultCard>
                  <OutputResultTitle>{executeStatus.message}</OutputResultTitle>
                  <OutputResultNumberContainer>
                    <OutputResultNumber>
                      執行時間：
                      {executeStatus.data.time}
                      s
                    </OutputResultNumber>
                    <OutputResultNumber>
                      記憶體使用量：
                      {executeStatus.data.memory}
                      KB
                    </OutputResultNumber>
                  </OutputResultNumberContainer>
                </OutputResultCard>
                <OutputResultLabel>標準輸出</OutputResultLabel>
                <Card style={{ marginTop: '15px' }}>
                  {executeStatus.data.stdout.split('\n').map((item) => <p>{item}</p>)}
                </Card>
                {executeStatus.data.stderr !== ''
                  && (
                  <>
                    <OutputResultLabel>標準輸出</OutputResultLabel>
                    <Card style={{ marginTop: '15px' }}>
                      {executeStatus.data.stderr.split('\n').map((item) => <p>{item}</p>)}
                    </Card>
                  </>
                  )}
              </OutputBlock>
            </div>
          </Splitter>
        </div>
      </EditorBlock>
    </Section>
  );
}
