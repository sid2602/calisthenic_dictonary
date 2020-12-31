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
  }

  pre{
    margin: 0;
  }
  `;
