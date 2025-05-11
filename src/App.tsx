import React from 'react';
// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';

import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import githubClient from './services/github/client';
import Routes from './routes';

const App: React.FC = () => {
  console.log('App component rendered', import.meta.env.VITE_GITHUB_TOKEN);

  return (
    <ApolloProvider client={githubClient}>
      <div>HELLO</div>
      {/* <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider> */}
    </ApolloProvider>
  );
};

export default App;
