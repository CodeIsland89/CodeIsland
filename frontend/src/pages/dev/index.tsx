import React, { useState } from 'react';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';

const newLineRegex = /(\n)/g; // 換行代號
const fieldRegex = /({})/g; // 欄位代號

const question = 'const a = {} ; \n const b = {} ; \n const c = {} + {} ; \n'; // 題目
const options = [1, 2, 3, 5, 4]; // 選項
const correctAnswers = [1, 0, 3, 4]; // 正確答案

const findClozeBlockLength = (str) => {
  const clozeBlockRegex = /({})/g;
  const clozeBlock = str.match(clozeBlockRegex);
  return clozeBlock ? clozeBlock.length : 0;
};

export default function Index() {
  const clozeBlockLength = findClozeBlockLength(question); // 欄位數量
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(clozeBlockLength).fill('')); // 選擇的答案

  const handleSelect = (e) => {
    const { name } = e.target;
    const filledBlockLength = selectedAnswers.filter((answer) => answer !== '').length; // 已填答案數量
    if (selectedAnswers.includes(name)) {
      const index = selectedAnswers.indexOf(name);
      // set index element replace by ''
      setSelectedAnswers((prev) => [
        ...prev.slice(0, index),
        '',
        ...prev.slice(index + 1),
      ]);
    } else if (filledBlockLength < correctAnswers.length) { // 如果答案數量少於正確答案數量才能繼續選擇其他答案
      const emptyIndex = selectedAnswers.indexOf('');
      if (emptyIndex !== -1) {
        // set emptyIndex element replace by name
        setSelectedAnswers((prev) => [
          ...prev.slice(0, emptyIndex),
          name,
          ...prev.slice(emptyIndex + 1),
        ]);
      }
    }
  };

  const Container = styled.div`
    margin: 10rem;
    border: 1px solid black;
    padding: 1rem;
    line-height: 2rem;
    font-size: 1rem;
    display: block;
    height: max-content;

    .selected {
      background-color: #4CAF50;
    }
    
    .selected:hover {
      background-color: #3C9F40;
    }
  `;

  const Field = styled.span`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    margin: 0.2rem 0.25rem;
    min-width: 2rem;
    line-height: 1.6rem;
    height: 1.6rem;

    text-align: center;
    color: white; // 文字顏色
    background-color: #4CAF50; // 背景顏色
  `;

  const Option = styled.button`
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
  `;

  const Options = options.map((option, index) => (
    <Option
      key={option}
      name={`op-${index}`}
      onClick={(e) => handleSelect(e)}
      className={
        selectedAnswers.includes(`op-${index}`) ? 'selected' : ''
      }
    >
      {option}
    </Option>
  ));

  const clozeCode = () => {
    let replacedCode = reactStringReplace(question, fieldRegex, (match, i) => {
      const answer = selectedAnswers[Math.floor(i / 2)];
      const option = Options.find((target) => target.props.name === answer);
      return <Field key={i}>{option ? option.key : ''}</Field>;
    });

    replacedCode = reactStringReplace(replacedCode, newLineRegex, () => (
      <br />
    ));

    return replacedCode;
  };

  return (
    <>
      {/* 題目 */}
      <Container>
        {clozeCode()}
      </Container>
      {/* 選項 */}
      <Container>
        {Options}
      </Container>
    </>
  );
}