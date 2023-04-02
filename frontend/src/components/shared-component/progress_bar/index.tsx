import React from 'react';
import styled from 'styled-components';
import color from '../../../global/theme/color';

type ContainerProp = {
  color?: string,
};

const Container = styled.div<ContainerProp>`
  display: flex;
  flex-direction: row;
  align-items: center;

  progress {
    margin-right: 8px;
    height: fit-content;
  }

  progress[value] {
    flex-grow: 1;

    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 10px;
    border-radius: 20px;
    background-color: #eee;
  }  

  progress[value]::-webkit-progress-value {
    height: 10px;
    border-radius: 20px;
    background-color: ${(props) => (props.color ? props.color : '#000000')};
  }
`;

type Props = {
  value: number,
  max: number,
  bar_color?: string,
};

function ProgressBar({ value, max, bar_color = color.teal_400 } : Props) {
  return (
    <Container color={bar_color}>
      <progress value={value} max={max} />
      <span>
        {Math.round((value / max) * 100)}
        %
      </span>
    </Container>
  );
}

export default ProgressBar;
