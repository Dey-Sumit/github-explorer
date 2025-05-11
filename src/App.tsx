import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Paper, Box } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import Layout from './components/layout/Layout';
import githubClient from './services/github/client';
import RepositoryList from './components/repository/repository-list';

const App: React.FC = () => {
  return (
    <ApolloProvider client={githubClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Paper>
            <Box p={3}>
              <Typography variant="h4" component="h1" gutterBottom>
                GitHub Repository Explorer
              </Typography>
              <RepositoryList />
            </Box>
          </Paper>
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
