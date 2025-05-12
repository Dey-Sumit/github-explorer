import React, { ReactNode } from 'react';
import { Typography, CircularProgress, Box, styled } from '@mui/material';

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
});

interface DataStateWrapperProps {
  loading: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  children: ReactNode;
}

const DataStateWrapper = ({
  loading,
  error,
  isEmpty = false,
  emptyMessage = 'No data found',
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: DataStateWrapperProps) => {
  if (loading) {
    return (
      loadingComponent || (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      )
    );
  }

  if (error) {
    return (
      errorComponent || (
        <Box>
          <Typography color="error" variant="h6">
            Error: {error.message}
          </Typography>
        </Box>
      )
    );
  }

  if (isEmpty) {
    return emptyComponent || <Typography>{emptyMessage}</Typography>;
  }

  return children;
};

export default DataStateWrapper;
