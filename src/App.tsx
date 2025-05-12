import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import githubClient from './services/github/client';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <ApolloProvider client={githubClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
