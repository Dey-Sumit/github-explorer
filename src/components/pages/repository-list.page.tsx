/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Typography,
  CircularProgress,
  Grid,
  Box,
  Container,
  Button,
  Divider,
} from '@material-ui/core';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@material-ui/icons';
import { useRepositoryListStyles } from '@/components/repository/repositoryList.styles';
import { RepositoryCard } from '@/components/repository/repository-card';
import UserHeader from '@/components/repository/user-header';
import { GET_USER_REPOSITORIES } from '@/services/github/queries';
import {
  UserRepositoriesData,
  UserRepositoriesVariables,
  Repository,
} from '@/types/github.types';
import { useHistory } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const RepositoryList: React.FC = () => {
  const classes = useRepositoryListStyles();

  const username = 'Dey-Sumit';

  const history = useHistory();

  // Track page cursors for navigation
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    cursors: [null] as Array<string | null>, // null for first page
  });

  // This is the key - currentCursor changes when currentPage changes
  const currentCursor = pageInfo.cursors[pageInfo.currentPage - 1];

  const { loading, error, data, fetchMore, networkStatus } = useQuery<
    UserRepositoriesData,
    UserRepositoriesVariables
  >(GET_USER_REPOSITORIES, {
    variables: {
      login: username,
      first: ITEMS_PER_PAGE,
      after: currentCursor,
    },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const repositories = data?.user?.repositories?.edges || [];
  const pageData = data?.user?.repositories?.pageInfo;
  const totalCount = data?.user?.repositories?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const isLoadingMore = networkStatus === 3;

  const handleNextPage = async () => {
    if (!pageData?.hasNextPage || isLoadingMore) return;

    try {
      const nextCursor = pageData.endCursor;

      // Only fetch if we haven't been to this page before
      if (!pageInfo.cursors[pageInfo.currentPage]) {
        await fetchMore({
          variables: {
            first: ITEMS_PER_PAGE,
            after: nextCursor,
          },
        });

        // Store the cursor for this page
        setPageInfo(prev => ({
          currentPage: prev.currentPage + 1,
          cursors: [...prev.cursors, nextCursor],
        }));
      } else {
        // We've been here before, just update the page
        setPageInfo(prev => ({
          ...prev,
          currentPage: prev.currentPage + 1,
        }));
      }
    } catch (e) {
      console.error('Failed to fetch next page:', e);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.currentPage === 1) return;

    // Just update the page - this changes currentCursor, triggering a new query
    setPageInfo(prev => ({
      ...prev,
      currentPage: prev.currentPage - 1,
    }));
  };

  const handleRepositoryClick = useCallback(
    (repository: Repository) => {
      history.push(`/repository/${repository.name}`);
    },
    [history]
  );

  if (loading && !data) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <UserHeader username={username} avatarUrl={data?.user?.avatarUrl || ''} />

      <Divider className={classes.divider} />

      <Box className={classes.repositoriesHeader}>
        {/* <CodeIcon style={{ marginRight: theme.spacing(1) }} /> */}
        <Typography variant="h5" component="h2">
          Repositories ({totalCount})
        </Typography>
      </Box>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Page {pageInfo.currentPage} of {totalPages}
      </Typography>

      {repositories.length === 0 ? (
        <Typography>No repositories found</Typography>
      ) : (
        <>
          <Box style={{ position: 'relative', minHeight: 400 }}>
            {isLoadingMore && (
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            <Grid container spacing={3}>
              {repositories.map(({ node }) => (
                <Grid item xs={12} sm={6} md={4} key={node.id}>
                  <RepositoryCard
                    repository={node}
                    onClick={handleRepositoryClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className={classes.paginationContainer}>
            <Button
              variant="outlined"
              startIcon={<PrevIcon />}
              onClick={handlePrevPage}
              disabled={pageInfo.currentPage === 1 || isLoadingMore}
            >
              Previous
            </Button>

            <Box mx={3} display="flex" alignItems="center">
              <Typography variant="body1">
                Page {pageInfo.currentPage} of {totalPages}
              </Typography>
              {isLoadingMore && (
                <CircularProgress size={20} style={{ marginLeft: 8 }} />
              )}
            </Box>

            <Button
              variant="outlined"
              endIcon={<NextIcon />}
              onClick={handleNextPage}
              disabled={!pageData?.hasNextPage || isLoadingMore}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default RepositoryList;
