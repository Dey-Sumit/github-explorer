import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Typography,
  styled,
} from '@mui/material';
import { GET_REPOSITORY_DETAILS } from '@/services/github/queries';
import { RepositoryDetailData } from '@/types/github.types';
import { GITHUB_API } from '@/services/github/constants';
import PullRequestList from '../repository/pull-request-list';
import RepositoryHeader from '../repository/repository-header';

const DetailContainer = styled(Box)(() => ({
  width: '100%',
  margin: '0 auto',
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
    minWidth: 0,
    marginRight: theme.spacing(3),
    padding: theme.spacing(1, 0),
  },
  '& .MuiTabs-indicator': {
    height: 3,
  },
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
});

const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const RepositoryDetail: React.FC = () => {
  const { name } = useParams<{
    name: string;
  }>();
  const [tabValue, setTabValue] = useState(0);

  const { loading, error, data } = useQuery<RepositoryDetailData>(
    GET_REPOSITORY_DETAILS,
    {
      variables: {
        owner: GITHUB_API.USERNAME,
        name,
      },
    }
  );

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <ErrorContainer>
          <Typography color="error" variant="h6">
            Error: {error.message}
          </Typography>
        </ErrorContainer>
      </DetailContainer>
    );
  }

  if (!data || !data.repository) {
    return (
      <DetailContainer>
        <ErrorContainer>
          <Typography variant="h6">Repository not found</Typography>
        </ErrorContainer>
      </DetailContainer>
    );
  }

  const { repository } = data;
  const pullRequests = repository.pullRequests.edges.map(edge => edge.node);

  const openPRCount = pullRequests.filter(pr => pr.state === 'OPEN').length;
  const closedPRCount = pullRequests.filter(
    pr => pr.state === 'CLOSED' || pr.state === 'MERGED'
  ).length;

  return (
    <DetailContainer>
      <ContentPaper elevation={0}>
        <RepositoryHeader repository={repository} />

        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="Pull request tabs"
        >
          <Tab
            label={`Open (${openPRCount})`}
            id="tab-open"
            aria-controls="panel-open"
          />
          <Tab
            label={`Closed (${closedPRCount})`}
            id="tab-closed"
            aria-controls="panel-closed"
          />
        </StyledTabs>

        <Box role="tabpanel" id="panel-open" hidden={tabValue !== 0}>
          {tabValue === 0 && (
            <PullRequestList
              pullRequests={pullRequests}
              loading={false}
              tabState="OPEN"
            />
          )}
        </Box>

        <Box role="tabpanel" id="panel-closed" hidden={tabValue !== 1}>
          {tabValue === 1 && (
            <PullRequestList
              pullRequests={pullRequests}
              loading={false}
              tabState="CLOSED"
            />
          )}
        </Box>
      </ContentPaper>
    </DetailContainer>
  );
};

export default RepositoryDetail;
