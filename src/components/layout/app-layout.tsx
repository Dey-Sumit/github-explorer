import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  styled,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: 48,
  display: 'flex',
  justifyContent: 'space-between',
});

const MainContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 48px)',
}));

const HeaderLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  letterSpacing: '0.03em',
}));

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isRoot = location.pathname === '/';

  return (
    <>
      <StyledAppBar position="static">
        <StyledToolbar>
          <HeaderLogo variant="h4">GitHux</HeaderLogo>

          <Box>
            {isRoot && (
              <Button
                component={RouterLink}
                to="/new"
                variant="contained"
                size="small"
                color="success"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            )}
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <MainContainer maxWidth="lg">{children}</MainContainer>
    </>
  );
};

export default AppLayout;
