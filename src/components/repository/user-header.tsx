import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

interface UserHeaderProps {
  username: string;
  avatarUrl: string;
}

const UserHeader = ({ username, avatarUrl }: UserHeaderProps) => {
  return null;
  // <Box className={classes.header}>
  //   <Avatar src={avatarUrl} alt={username} className={classes.avatar}>
  //     <PersonIcon />
  //   </Avatar>
  //   <Box className={classes.headerContent}>
  //     <Typography variant="h4" component="h1">
  //       {username}
  //     </Typography>
  //     <Typography variant="body1" color="textSecondary">
  //       GitHub repositories for ${username}
  //     </Typography>
  //   </Box>
  // </Box>
};
export default UserHeader;
