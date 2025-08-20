import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  /* Gotham Font Imports */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
  
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fontWeights.normal};
    line-height: 1.6;
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.fontWeights.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing[4]};
  }

  h1 {
    font-size: ${theme.fontSizes["5xl"]};
    font-weight: ${theme.fontWeights.black};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes["4xl"]};
    }
  }

  h2 {
    font-size: ${theme.fontSizes["4xl"]};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes["3xl"]};
    }
  }

  h3 {
    font-size: ${theme.fontSizes["3xl"]};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes["2xl"]};
    }
  }

  h4 {
    font-size: ${theme.fontSizes["2xl"]};
  }

  h5 {
    font-size: ${theme.fontSizes.xl};
  }

  h6 {
    font-size: ${theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      opacity: 0.8;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    transition: ${theme.transitions.fast};
    
    &:focus {
      outline: 2px solid ${theme.colors.primary.blue};
      outline-offset: 2px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.blue};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.teal};
  }

  /* Selection color */
  ::selection {
    background-color: ${theme.colors.primary.blue};
    color: ${theme.colors.text.white};
  }

  /* Focus styles */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Skip link */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${theme.colors.primary.blue};
    color: ${theme.colors.text.white};
    padding: ${theme.spacing[2]} ${theme.spacing[4]};
    border-radius: ${theme.borderRadius.md};
    text-decoration: none;
    z-index: 100;
    
    &:focus {
      top: 6px;
    }
  }
`;
