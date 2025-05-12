import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
  Paper,
  styled,
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@mui/icons-material';
import { RepositoryCard } from '@/components/repository/repository-card';
import { GET_USER_REPOSITORIES } from '@/services/github/queries';
import {
  UserRepositoriesData,
  UserRepositoriesVariables,
  Repository,
} from '@/types/github.types';
import { useNavigate } from 'react-router-dom';
import { GITHUB_API } from '@/constants';

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden', // Prevent content overflow
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const ScrollableContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
  flex: 1,
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
});

const RepositoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const { ITEMS_PER_PAGE } = GITHUB_API;

const RepositoryList: React.FC = () => {
  const navigate = useNavigate();

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
      login: GITHUB_API.USERNAME,
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
    setPageInfo(prev => ({
      ...prev,
      currentPage: prev.currentPage - 1,
    }));
  };

  const handleRepositoryClick = useCallback(
    (repository: Repository) => {
      navigate(`/repository/${repository.name}`);
    },
    [navigate]
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
      <Box>
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <ContentContainer elevation={0}>
      <ScrollableContent>
        <RepositoryHeader>
          <Typography variant="h5" component="h2">
            Repositories ({totalCount})
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Page {pageInfo.currentPage} of {totalPages}
          </Typography>
        </RepositoryHeader>

        {repositories.length === 0 ? (
          <Typography>No repositories found</Typography>
        ) : (
          <Box sx={{ position: 'relative' }}>
            {isLoadingMore && (
              <LoadingOverlay>
                <CircularProgress />
              </LoadingOverlay>
            )}

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {repositories.map(({ node }) => (
                <Grid key={node.id} size={{ xs: 4, sm: 4, md: 4 }}>
                  <RepositoryCard
                    repository={node}
                    onClick={handleRepositoryClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </ScrollableContent>

      <PaginationContainer>
        <Button
          variant="outlined"
          startIcon={<PrevIcon />}
          onClick={handlePrevPage}
          disabled={pageInfo.currentPage === 1 || isLoadingMore}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>

        <Typography variant="body2" sx={{ mx: 2 }}>
          {pageInfo.currentPage} of {totalPages}
        </Typography>

        <Button
          variant="outlined"
          endIcon={<NextIcon />}
          onClick={handleNextPage}
          disabled={!pageData?.hasNextPage || isLoadingMore}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </PaginationContainer>
    </ContentContainer>
  );
};

export default RepositoryList;
