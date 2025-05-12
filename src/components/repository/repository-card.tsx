import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star as StarIcon, CallSplit as ForkIcon } from '@mui/icons-material';
import { Repository } from '../../types/github.types';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const RepoName = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

const Description = styled(Typography)(({ theme }) => ({
  flex: 1,
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const StatsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
});

const StatChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.5),
}));

interface RepositoryCardProps {
  repository: Repository;
  onClick: (repository: Repository) => void;
}

export const RepositoryCard = ({
  repository,
  onClick,
}: RepositoryCardProps) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick?.(repository);
  };

  return (
    <StyledCard variant="outlined" onClick={handleClick}>
      <StyledCardContent>
        <RepoName variant="h6">{repository.name}</RepoName>
        <Description variant="body2" color="text.secondary">
          {repository.description || 'No description provided'}
        </Description>

        <StatsContainer>
          <Box>
            <StatChip
              icon={<StarIcon fontSize="small" />}
              label={repository.stargazerCount}
              size="small"
              variant="outlined"
            />
            <StatChip
              icon={<ForkIcon fontSize="small" />}
              label={repository.forkCount}
              size="small"
              variant="outlined"
            />
          </Box>
          {repository.primaryLanguage && (
            <Chip
              label={repository.primaryLanguage.name}
              size="small"
              sx={{
                backgroundColor:
                  repository.primaryLanguage.color || theme.palette.grey[300],
                color: theme.palette.getContrastText(
                  repository.primaryLanguage.color || theme.palette.grey[300]
                ),
              }}
            />
          )}
        </StatsContainer>
      </StyledCardContent>
    </StyledCard>
  );
};
