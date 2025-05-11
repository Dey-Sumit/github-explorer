import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
