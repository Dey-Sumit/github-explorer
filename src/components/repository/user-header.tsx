import React from 'react';
import { Box, Avatar, Typography } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { useRepositoryListStyles } from './repositoryList.styles';

interface UserHeaderProps {
  username: string;
  avatarUrl: string;
}

const UserHeader = ({ username, avatarUrl }: UserHeaderProps) => {
  const classes = useRepositoryListStyles();

  return (
    <Box className={classes.header}>
      <Avatar src={avatarUrl} alt={username} className={classes.avatar}>
        <PersonIcon />
      </Avatar>
      <Box className={classes.headerContent}>
        <Typography variant="h4" component="h1">
          {username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          GitHub repositories for ${username}
        </Typography>
      </Box>
    </Box>
  );
};
export default UserHeader;
