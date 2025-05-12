import React from 'react';
import { Typography, Box, Chip, Link, styled } from '@mui/material'; // Updated from @material-ui/core
import {
  Star as StarIcon,
  CallSplit as ForkIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { Repository } from '@/types/github.types';

// Styled components
const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const RepoDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderColor: theme.palette.divider,
  '& .MuiChip-label': {
    fontWeight: 500,
  },
}));

const ViewLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  '& svg': {
    marginRight: theme.spacing(0.5),
  },
}));

const RepoTitle = styled(Typography)(() => ({
  fontWeight: 600,
  wordBreak: 'break-word',
}));

interface RepositoryHeaderProps {
  repository: Repository;
}

const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({ repository }) => {
  return (
    <HeaderContainer>
      <RepoTitle variant="h4">{repository.name}</RepoTitle>

      {repository.description && (
        <RepoDescription variant="body1">
          {repository.description}
        </RepoDescription>
      )}

      <StatsContainer>
        <StyledChip
          icon={<StarIcon fontSize="small" />}
          label={`${repository.stargazerCount} stars`}
          variant="outlined"
          size="small"
        />

        <StyledChip
          icon={<ForkIcon fontSize="small" />}
          label={`${repository.forkCount} forks`}
          variant="outlined"
          size="small"
        />

        <ViewLink
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          <LinkIcon fontSize="small" />
          View on GitHub
        </ViewLink>
      </StatsContainer>
    </HeaderContainer>
  );
};

export default RepositoryHeader;
