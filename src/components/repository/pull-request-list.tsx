import React from 'react';
import { List, Typography, Box, CircularProgress, styled } from '@mui/material'; // Updated from @material-ui/core
import { PullRequest } from '@/types/github.types';
import PullRequestItem from './pull-request-item';

// Styled components
const StyledList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `1px dashed ${theme.palette.divider}`,
  backgroundColor: 'rgba(255, 255, 255, 0.02)', // Subtle highlight for empty state
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

interface PullRequestListProps {
  pullRequests: PullRequest[];
  loading: boolean;
  tabState: 'OPEN' | 'CLOSED'; // "CLOSED" tab includes both CLOSED and MERGED states
}

const PullRequestList: React.FC<PullRequestListProps> = ({
  pullRequests,
  loading,
  tabState,
}) => {
  // Filter pull requests based on selected tab
  const filteredPullRequests =
    tabState === 'OPEN'
      ? pullRequests.filter(pr => pr.state === 'OPEN')
      : pullRequests.filter(
          pr => pr.state === 'CLOSED' || pr.state === 'MERGED'
        );

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress size={30} />
      </LoadingContainer>
    );
  }

  if (filteredPullRequests.length === 0) {
    return (
      <EmptyState>
        <Typography variant="body1" color="text.secondary">
          No {tabState.toLowerCase()} pull requests found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {tabState === 'OPEN'
            ? 'Pull requests that are still being reviewed appear here.'
            : 'Completed pull requests appear here.'}
        </Typography>
      </EmptyState>
    );
  }

  return (
    <StyledList disablePadding>
      {filteredPullRequests.map(pullRequest => (
        <PullRequestItem key={pullRequest.id} pullRequest={pullRequest} />
      ))}
    </StyledList>
  );
};

export default PullRequestList;
