import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import NavBar from '../components/Navbar';

const theme = {
  red: '#FF0000',
  black: '#393939',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  green: '#009933',
  maxWidth: '1900px',
};

const StyledPage = styled.div`
  background-color: ${(props) => props.theme.offWhite};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 3vw;
  font-size: calc(6px + 2vmin);
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
`;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
}
`;

class StyledApp extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <StyledPage>
          <GlobalStyle />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default StyledApp;
