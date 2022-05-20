import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  body, button, input {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1;
  }
`;

export default GlobalStyle;
