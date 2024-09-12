import React, { CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

// 定義旋轉的關鍵幀
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 使用Styled Components建立Spinner元素
const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* 邊框顏色 */
  border-top: 4px solid #3498db; /* 頂部邊框顏色 */
  border-radius: 50%; /* 圓形邊框 */
  width: 40px; /* 寬度 */
  height: 40px; /* 高度 */
  animation: ${spinAnimation} 0.8s linear infinite; /* 播放旋轉動畫 */
`;

// LoadingSpinner元件
type Props = {
  customStyle?: CSSProperties
};

export default function LoadingSpinner({ customStyle }: Props) {
  return <Spinner style={customStyle} />;
}
