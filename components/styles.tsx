import styled, { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  *{
    box-sizing: border-box;
  }
  body{
    height: 100vh;
    font-family: "Roboto"
  }

  a{
    text-decoration: none;
    color: white;
  }

  pre{
    margin: 0;
  }
  h1,h2,h3,h4,h5{
    margin: 0;
    padding: 0;
  }
  `;
