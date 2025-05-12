/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from 'react';
import { Typography, CircularProgress, Box, styled } from '@mui/material';

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
});

const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
}));

const EmptyContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '30vh',
  color: theme.palette.text.secondary,
}));

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

const DefaultLoadingComponent = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);

const DefaultErrorComponent = ({ error }: { error: Error }) => (
  <ErrorContainer>
    <Typography variant="h6" gutterBottom>
      Error Occurred
    </Typography>
    <Typography variant="body2">{error.message}</Typography>
  </ErrorContainer>
);

const DefaultEmptyComponent = ({ message }: { message: string }) => (
  <EmptyContainer>
    <Typography variant="body1">{message}</Typography>
  </EmptyContainer>
);

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
  // Handle loading state
  if (loading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <DefaultLoadingComponent />
    );
  }

  // Handle error state
  if (error) {
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <DefaultErrorComponent error={error} />
    );
  }

  // Handle empty state
  if (isEmpty) {
    return emptyComponent ? (
      <>{emptyComponent}</>
    ) : (
      <DefaultEmptyComponent message={emptyMessage} />
    );
  }

  // Normal state - render children
  return <>{children}</>;
};

export default DataStateWrapper;
