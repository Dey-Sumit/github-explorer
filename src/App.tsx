import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Paper, Box } from '@material-ui/core';
import theme from './theme';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Paper>
          <Box p={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to GitHub Repository Explorer
            </Typography>
            <Typography variant="body1">
              This application allows you to browse and manage your GitHub
              repositories.
            </Typography>
          </Box>
        </Paper>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
