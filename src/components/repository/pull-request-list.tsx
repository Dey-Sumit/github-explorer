import React from 'react';
import {
  List,
  Typography,
  Box,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { PullRequest } from '@/types/github.types';
import PullRequestItem from './pull-request-item';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  noData: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
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
  const classes = useStyles();

  // Filter pull requests based on selected tab
  const filteredPullRequests =
    tabState === 'OPEN'
      ? pullRequests.filter(pr => pr.state === 'OPEN')
      : pullRequests.filter(
          pr => pr.state === 'CLOSED' || pr.state === 'MERGED'
        );

  if (loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    );
  }

  if (filteredPullRequests.length === 0) {
    return (
      <Box className={classes.noData}>
        <Typography variant="body1" color="textSecondary">
          No {tabState.toLowerCase()} pull requests found
        </Typography>
      </Box>
    );
  }

  return (
    <List className={classes.root} disablePadding>
      {filteredPullRequests.map(pullRequest => (
        <PullRequestItem key={pullRequest.id} pullRequest={pullRequest} />
      ))}
    </List>
  );
};

export default PullRequestList;
