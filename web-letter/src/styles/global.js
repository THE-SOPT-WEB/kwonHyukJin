import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button:hover {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  ul, li {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
