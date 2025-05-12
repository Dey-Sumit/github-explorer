import React from 'react';
import { Grid, Box, CircularProgress, styled } from '@mui/material';
import { RepositoryCard } from '@/components/repository/repository-card';
import { Repository } from '@/types/github.types';

const LoadingOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1,
});

interface RepositoryGridProps {
  repositories: Repository[];
  loading?: boolean;
  onRepositoryClick: (repository: Repository) => void;
}

const RepositoryGrid: React.FC<RepositoryGridProps> = ({
  repositories,
  loading = false,
  onRepositoryClick,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {loading && (
        <LoadingOverlay>
          <CircularProgress />
        </LoadingOverlay>
      )}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {repositories.map(repository => (
          <Grid key={repository.id} size={{ xs: 4, sm: 4, md: 4 }}>
            <RepositoryCard
              repository={repository}
              onClick={onRepositoryClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RepositoryGrid;
