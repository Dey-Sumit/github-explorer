import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Container,
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { GET_REPOSITORY_DETAILS } from '@/services/github/queries';
import {
  RepositoryDetailParams,
  RepositoryDetailData,
} from '@/types/github.types';
import PullRequestList from '../repository/pull-request-list';
import RepositoryHeader from '../repository/repository-header';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  tabs: {
    marginBottom: theme.spacing(2),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  errorContainer: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
}));

const RepositoryDetail: React.FC = () => {
  const classes = useStyles();
  const { name } = useParams<RepositoryDetailParams>();
  const [tabValue, setTabValue] = useState(0);

  const username = 'Dey-Sumit';

  const { loading, error, data } = useQuery<RepositoryDetailData>(
    GET_REPOSITORY_DETAILS,
    {
      variables: {
        owner: username,
        name,
      },
    }
  );

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    console.log('Tab changed to:', event);

    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box className={classes.errorContainer}>
          <Typography color="error" variant="h6">
            Error: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!data || !data.repository) {
    return (
      <Container>
        <Box className={classes.errorContainer}>
          <Typography variant="h6">Repository not found</Typography>
        </Box>
      </Container>
    );
  }

  const { repository } = data;
  const pullRequests = repository.pullRequests.edges.map(edge => edge.node);

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={1}>
        <RepositoryHeader repository={repository} />

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
        >
          <Tab
            label={`Open (${
              pullRequests.filter(pr => pr.state === 'OPEN').length
            })`}
          />
          <Tab
            label={`Closed (${
              pullRequests.filter(
                pr => pr.state === 'CLOSED' || pr.state === 'MERGED'
              ).length
            })`}
          />
        </Tabs>

        {tabValue === 0 && (
          <PullRequestList
            pullRequests={pullRequests}
            loading={false}
            tabState="OPEN"
          />
        )}

        {tabValue === 1 && (
          <PullRequestList
            pullRequests={pullRequests}
            loading={false}
            tabState="CLOSED"
          />
        )}
      </Paper>
    </Container>
  );
};

export default RepositoryDetail;
