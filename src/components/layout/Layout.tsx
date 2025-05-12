import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[200],
  },
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            GitHub Repository Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Empty toolbar for spacing */}
      <main className={classes.content}>
        <Container maxWidth="lg">
          <Box my={4}>{children}</Box>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            GitHub Repository Explorer &copy; {new Date().getFullYear()}
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
