import React from 'react';
import { Button, Typography, Box, styled } from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@mui/icons-material';

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  isLoading: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  isLoading,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <PaginationContainer>
      <Button
        variant="outlined"
        startIcon={<PrevIcon />}
        onClick={onPrevPage}
        disabled={currentPage === 1 || isLoading}
        sx={{ mr: 2 }}
      >
        Previous
      </Button>

      <Typography variant="body2" sx={{ mx: 2 }}>
        {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="outlined"
        endIcon={<NextIcon />}
        onClick={onNextPage}
        disabled={!hasNextPage || isLoading}
        sx={{ ml: 2 }}
      >
        Next
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
