import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    height: max-content;
  }

  body > * {
    height: max-content;
  }
`;

export default GlobalStyle;
