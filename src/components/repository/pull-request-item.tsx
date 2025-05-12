import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
  Box,
  Link,
  styled,
} from '@mui/material';
import {
  MergeType as MergeIcon,
  Cancel as CloseIcon,
  Adjust as OpenIcon,
} from '@mui/icons-material';
import { PullRequest } from '@/types/github.types';
import { formatDistanceToNow } from '@/utils/date.utils';

// Styled components
const StyledListItem = styled(ListItem)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2, 3),
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)', // Subtle highlight on hover
  },
}));

const PRLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
}));

const PRTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  marginBottom: theme.spacing(0.5),
}));

const SecondaryInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));

// GitHub color constants
const GITHUB_COLORS = {
  open: '#1f883d', // GitHub green
  closed: '#cf222e', // GitHub red
  merged: '#8250df', // GitHub purple
};

// Custom styled chips for different PR states
const OpenChip = styled(Chip)(() => ({
  backgroundColor: GITHUB_COLORS.open,
  color: 'white',
  fontWeight: 600,
  fontSize: '0.75rem',
}));

const ClosedChip = styled(Chip)(() => ({
  backgroundColor: GITHUB_COLORS.closed,
  color: 'white',
  fontWeight: 600,
  fontSize: '0.75rem',
}));

const MergedChip = styled(Chip)(() => ({
  backgroundColor: GITHUB_COLORS.merged,
  color: 'white',
  fontWeight: 600,
  fontSize: '0.75rem',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  border: `1px solid ${theme.palette.divider}`,
}));

interface PullRequestItemProps {
  pullRequest: PullRequest;
}

const PullRequestItem: React.FC<PullRequestItemProps> = ({ pullRequest }) => {
  const formattedDate = formatDistanceToNow(pullRequest.createdAt);

  // Render the appropriate chip based on PR state
  const renderStateChip = () => {
    switch (pullRequest.state) {
      case 'OPEN':
        return (
          <OpenChip
            icon={<OpenIcon fontSize="small" />}
            label="Open"
            size="small"
          />
        );
      case 'MERGED':
        return (
          <MergedChip
            icon={<MergeIcon fontSize="small" />}
            label="Merged"
            size="small"
          />
        );
      case 'CLOSED':
        return (
          <ClosedChip
            icon={<CloseIcon fontSize="small" />}
            label="Closed"
            size="small"
          />
        );
      default:
        return <ClosedChip label={pullRequest.state} size="small" />;
    }
  };

  return (
    <StyledListItem alignItems="flex-start">
      <ListItemAvatar>
        <StyledAvatar
          alt={pullRequest.author?.login || 'Unknown'}
          src={pullRequest.author?.avatarUrl}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <PRLink
            href={pullRequest.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PRTitle>
              #{pullRequest.number} {pullRequest.title}
            </PRTitle>
          </PRLink>
        }
        secondary={
          <SecondaryInfo>
            {renderStateChip()}
            <Typography variant="body2" color="text.secondary">
              Created {formattedDate} by{' '}
              {pullRequest.author?.login || 'Unknown'}
            </Typography>
          </SecondaryInfo>
        }
      />
    </StyledListItem>
  );
};

export default PullRequestItem;
