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
  makeStyles,
} from '@material-ui/core';
import {
  MergeType as MergeIcon,
  Cancel as CloseIcon,
  Adjust as OpenIcon,
} from '@material-ui/icons';
import { PullRequest } from '@/types/github.types';
import { formatDistanceToNow } from '@/utils/date.utils';

const useStyles = makeStyles(theme => ({
  listItem: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  openChip: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  closedChip: {
    backgroundColor: '#cb2431',
    color: 'white',
  },
  mergedChip: {
    backgroundColor: '#6f42c1',
    color: 'white',
  },
  secondaryInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
}));

interface PullRequestItemProps {
  pullRequest: PullRequest;
}

const PullRequestItem: React.FC<PullRequestItemProps> = ({ pullRequest }) => {
  const classes = useStyles();

  const formattedDate = formatDistanceToNow(pullRequest.createdAt);

  // Determine chip style and icon based on PR state
  const getChipProps = () => {
    switch (pullRequest.state) {
      case 'OPEN':
        return {
          label: 'Open',
          className: classes.openChip,
          icon: <OpenIcon fontSize="small" />,
        };
      case 'MERGED':
        return {
          label: 'Merged',
          className: classes.mergedChip,
          icon: <MergeIcon fontSize="small" />,
        };
      case 'CLOSED':
        return {
          label: 'Closed',
          className: classes.closedChip,
          icon: <CloseIcon fontSize="small" />,
        };
      default:
        return {
          label: pullRequest.state,
          className: classes.closedChip,
        };
    }
  };

  const chipProps = getChipProps();

  return (
    <ListItem className={classes.listItem} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={pullRequest.author?.login || 'Unknown'}
          src={pullRequest.author?.avatarUrl}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link href={pullRequest.url} target="_blank" rel="noopener">
            <Typography variant="h6">
              #{pullRequest.number} {pullRequest.title}
            </Typography>
          </Link>
        }
        secondary={
          <Box className={classes.secondaryInfo}>
            <Chip
              icon={chipProps.icon}
              label={chipProps.label}
              size="small"
              className={chipProps.className}
            />
            <Typography variant="body2" color="textSecondary">
              Created {formattedDate} by{' '}
              {pullRequest.author?.login || 'Unknown'}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
};

export default PullRequestItem;
