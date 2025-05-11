import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Typography,
  CircularProgress,
  Grid,
  Box,
  Container,
  Button,
  useTheme,
} from '@material-ui/core';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@material-ui/icons';
import { GET_USER_REPOSITORIES } from '../../services/github/queries';
import {
  UserRepositoriesData,
  UserRepositoriesVariables,
} from '../../types/github';
import { useRepositoryListStyles } from './repositoryList.styles';
import { RepositoryCard } from './repository-card';

const ITEMS_PER_PAGE = 6;

const RepositoryList: React.FC = () => {
  const classes = useRepositoryListStyles();
  const theme = useTheme();

  const username = 'Dey-Sumit';
  // const [currentPage, setCurrentPage] = useState(1);

  // Track page cursors for navigation
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    cursors: [null] as Array<string | null>, // null for first page
  });
  console.log({ pageInfo });

  const currentCursor = pageInfo.cursors[pageInfo.currentPage - 1];

  // Instead of complex cursor tracking, use simple page-based variables
  const { loading, error, data, fetchMore, networkStatus } = useQuery<
    UserRepositoriesData,
    UserRepositoriesVariables
  >(GET_USER_REPOSITORIES, {
    variables: {
      login: username,
      first: ITEMS_PER_PAGE,
    },
    onCompleted: () => {
      console.log('Data loaded for page');
    },
    onError: e => {
      console.error('Failed to load repositories:', e);
      // Could show a toast notification here
    },
  });
  const repositories = data?.user?.repositories?.edges || [];
  const pageData = data?.user?.repositories?.pageInfo;
  const totalCount = data?.user?.repositories?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Check if we're loading more data
  const isLoadingMore = networkStatus === 3;

  const handleNextPage = async () => {
    if (!pageData?.hasNextPage || isLoadingMore) return;

    try {
      const nextCursor = pageData.endCursor;

      await fetchMore({
        variables: {
          first: ITEMS_PER_PAGE,
          after: nextCursor,
        },
      });

      setPageInfo(prev => ({
        currentPage: prev.currentPage + 1,
        cursors: [...prev.cursors, nextCursor],
      }));
    } catch (e) {
      console.error('Failed to fetch next page:', e);
    }
  };

  const handlePrevPage = async () => {
    if (pageInfo.currentPage === 1 || isLoadingMore) return;

    try {
      const prevPage = pageInfo.currentPage - 1;
      const prevCursor = pageInfo.cursors[prevPage - 1];

      await fetchMore({
        variables: {
          first: ITEMS_PER_PAGE,
          after: prevCursor,
        },
      });

      setPageInfo(prev => ({
        ...prev,
        currentPage: prevPage,
      }));
    } catch (e) {
      console.error('Failed to fetch previous page:', e);
    }
  };

  return (
    <Container className={classes.root}>
      {/* ... header content ... */}

      {repositories.length === 0 ? (
        <Typography>No repositories found</Typography>
      ) : (
        <>
          <Box style={{ position: 'relative' }}>
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
                    onClick={() => {
                      // Handle repository card click
                      console.log(`Clicked on ${node.name}`);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Pagination with loading states */}
          <Box className={classes.paginationContainer}>
            <Button
              variant="outlined"
              startIcon={<PrevIcon />}
              onClick={handlePrevPage}
              //      disabled={!pageInfo?.hasPreviousPage || isLoadingMore}
            >
              Previous
            </Button>

            <Box mx={3} display="flex" alignItems="center">
              <Typography variant="body1">
                {/* Page {pageInfo?.hasPreviousPage ? pageInfo.startCursor : 1} of{' '}
                {totalPages} */}
              </Typography>
              {isLoadingMore && (
                <CircularProgress size={20} style={{ marginLeft: 8 }} />
              )}
            </Box>

            <Button
              variant="outlined"
              endIcon={<NextIcon />}
              onClick={handleNextPage}
              // disabled={!pageInfo?.hasNextPage || isLoadingMore}
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
