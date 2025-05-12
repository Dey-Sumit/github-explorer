import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Typography, Box, styled, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { GET_USER_REPOSITORIES } from '@/services/github/queries';
import {
  UserRepositoriesData,
  UserRepositoriesVariables,
  Repository,
} from '@/types/github.types';
import { GITHUB_API } from '@/services/github/constants';
import { ROUTES } from '@/routes/constants';
import { useGraphQLPagination } from '@/hooks/use-graphql-pagination';
import RepositoryGrid from '../repository/repository-grid';
import DataStateWrapper from '../ui/data-set-wrapper';
import Pagination from '../ui/app-pagination';

const ContentContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const ScrollableContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
  flex: 1,
}));

const RepositoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const { ITEMS_PER_PAGE } = GITHUB_API;

const RepositoryList = () => {
  const navigate = useNavigate();

  const {
    currentPage,
    totalPages,
    currentCursor,
    handleNextPage,
    handlePrevPage,
  } = useGraphQLPagination({
    pageSize: ITEMS_PER_PAGE,
  });

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

  const repositories =
    data?.user?.repositories?.edges?.map(edge => edge.node) || [];
  const pageData = data?.user?.repositories?.pageInfo;
  const totalCount = data?.user?.repositories?.totalCount || 0;
  const isLoadingMore = networkStatus === 3;

  const handleRepositoryClick = useCallback(
    (repository: Repository) => {
      navigate(ROUTES.getRepositoryDetailPath(repository.name));
    },
    [navigate]
  );

  const handleNextPageClick = () => {
    if (pageData) {
      handleNextPage<UserRepositoriesData, UserRepositoriesVariables>(
        pageData,
        fetchMore
      );
    }
  };

  return (
    <DataStateWrapper
      loading={loading && !data}
      error={error}
      isEmpty={repositories.length === 0}
      emptyMessage="No repositories found"
    >
      <ContentContainer elevation={0}>
        <ScrollableContent>
          <RepositoryHeader>
            <Typography variant="h5" component="h2">
              Repositories ({totalCount})
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Page {currentPage} of{' '}
              {totalPages || Math.ceil(totalCount / ITEMS_PER_PAGE)}
            </Typography>
          </RepositoryHeader>

          <RepositoryGrid
            repositories={repositories}
            loading={isLoadingMore}
            onRepositoryClick={handleRepositoryClick}
          />
        </ScrollableContent>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || Math.ceil(totalCount / ITEMS_PER_PAGE)}
          hasNextPage={!!pageData?.hasNextPage}
          isLoading={isLoadingMore}
          onNextPage={handleNextPageClick}
          onPrevPage={handlePrevPage}
        />
      </ContentContainer>
    </DataStateWrapper>
  );
};

export default RepositoryList;
