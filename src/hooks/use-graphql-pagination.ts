import {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
} from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface UsePaginationProps {
  pageSize: number;
  totalCount?: number;
}

interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  currentCursor: string | null;
  pageInfo: {
    currentPage: number;
    cursors: Array<string | null>;
  };
  handleNextPage: <TData, TVariables>(
    pageInfo: PageInfo,
    fetchMore: (
      fetchMoreOptions: FetchMoreQueryOptions<TVariables, TData> &
        FetchMoreOptions<TData, TVariables>
    ) => Promise<ApolloQueryResult<TData>>
  ) => Promise<void>;
  handlePrevPage: () => void;
  setPageInfo: Dispatch<
    SetStateAction<{
      currentPage: number;
      cursors: Array<string | null>;
    }>
  >;
}

export const useGraphQLPagination = ({
  pageSize,
  totalCount = 0,
}: UsePaginationProps): UsePaginationResult => {
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    cursors: [null] as Array<string | null>,
  });

  const currentCursor = pageInfo.cursors[pageInfo.currentPage - 1];
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = async <TData, TVariables>(
    nodePageInfo: PageInfo,
    fetchMore: (
      fetchMoreOptions: FetchMoreQueryOptions<TVariables, TData> &
        FetchMoreOptions<TData, TVariables>
    ) => Promise<ApolloQueryResult<TData>>
  ): Promise<void> => {
    if (!nodePageInfo?.hasNextPage) return;

    try {
      const nextCursor = nodePageInfo.endCursor;

      if (!pageInfo.cursors[pageInfo.currentPage]) {
        await fetchMore({
          variables: {
            first: pageSize,
            after: nextCursor,
          } as unknown as Partial<TVariables>,
        });

        setPageInfo(prev => ({
          currentPage: prev.currentPage + 1,
          cursors: [...prev.cursors, nextCursor],
        }));
      } else {
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

  return {
    currentPage: pageInfo.currentPage,
    totalPages,
    currentCursor,
    pageInfo,
    handleNextPage,
    handlePrevPage,
    setPageInfo,
  };
};
