import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import githubClient from './services/github/client';
import RoutesWithLayout from './routes';

const App: React.FC = () => {
  return (
    <ApolloProvider client={githubClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesWithLayout />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
