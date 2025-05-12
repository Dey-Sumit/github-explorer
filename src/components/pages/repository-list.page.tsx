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
  styled,
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@mui/icons-material';
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

const RootContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const RepositoriesHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const RepositoryList: React.FC = () => {
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
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
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
    <RootContainer>
      <UserHeader username={username} avatarUrl={data?.user?.avatarUrl || ''} />

      <StyledDivider />

      <RepositoriesHeader>
        <Typography variant="h5" component="h2">
          Repositories ({totalCount})
        </Typography>
      </RepositoriesHeader>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Page {pageInfo.currentPage} of {totalPages}
      </Typography>

      {repositories.length === 0 ? (
        <Typography>No repositories found</Typography>
      ) : (
        <>
          <Box
            sx={{
              position: 'relative',
              minHeight: 400,
            }}
          >
            {isLoadingMore && (
              <Box
                sx={{
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

          <PaginationContainer>
            <Button
              variant="outlined"
              startIcon={<PrevIcon />}
              onClick={handlePrevPage}
              disabled={pageInfo.currentPage === 1 || isLoadingMore}
            >
              Previous
            </Button>

            <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">
                Page {pageInfo.currentPage} of {totalPages}
              </Typography>
              {isLoadingMore && (
                <CircularProgress size={20} sx={{ marginLeft: 1 }} />
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
          </PaginationContainer>
        </>
      )}
    </RootContainer>
  );
};

export default RepositoryList;
