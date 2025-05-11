import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { Star as StarIcon, CallSplit as ForkIcon } from '@material-ui/icons';
import { Repository } from '../../types/github.types';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    },
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  repoName: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  description: {
    flex: 1,
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  statChip: {
    margin: theme.spacing(0.5),
  },
}));

interface RepositoryCardProps {
  repository: Repository;
  onClick: (repository: Repository) => void;
}

export const RepositoryCard = ({
  repository,
  onClick,
}: RepositoryCardProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleClick = () => {
    onClick?.(repository);
  };

  return (
    <Card variant="outlined" className={classes.card} onClick={handleClick}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.repoName}>
          {repository.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          {repository.description || 'No description provided'}
        </Typography>

        <Box className={classes.statsContainer}>
          <Box>
            <Chip
              icon={<StarIcon fontSize="small" />}
              label={repository.stargazerCount}
              size="small"
              className={classes.statChip}
              variant="outlined"
            />
            <Chip
              icon={<ForkIcon fontSize="small" />}
              label={repository.forkCount}
              size="small"
              className={classes.statChip}
              variant="outlined"
            />
          </Box>
          {repository.primaryLanguage && (
            <Chip
              label={repository.primaryLanguage.name}
              size="small"
              style={{
                backgroundColor:
                  repository.primaryLanguage.color || theme.palette.grey[300],
                color: theme.palette.getContrastText(
                  repository.primaryLanguage.color || theme.palette.grey[300]
                ),
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
