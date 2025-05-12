import React from 'react';
import { Typography, Box, Chip, Link, makeStyles } from '@material-ui/core';
import {
  Star as StarIcon,
  CallSplit as ForkIcon,
  Link as LinkIcon,
} from '@material-ui/icons';
import { Repository } from '@/types/github.types';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

interface RepositoryHeaderProps {
  repository: Repository;
}

const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({ repository }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h1">
        {repository.name}
      </Typography>

      {repository.description && (
        <Typography variant="body1" className={classes.description}>
          {repository.description}
        </Typography>
      )}

      <Box className={classes.stats}>
        <Chip
          icon={<StarIcon />}
          label={`${repository.stargazerCount} stars`}
          variant="outlined"
          size="small"
          className={classes.chip}
        />

        <Chip
          icon={<ForkIcon />}
          label={`${repository.forkCount} forks`}
          variant="outlined"
          size="small"
          className={classes.chip}
        />

        <Link
          href={repository.url}
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <LinkIcon fontSize="small" style={{ marginRight: 4 }} />
          View on GitHub
        </Link>
      </Box>
    </Box>
  );
};

export default RepositoryHeader;
