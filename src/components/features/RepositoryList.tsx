import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Avatar,
  Container,
  Divider,
  useTheme,
  IconButton,
} from '@material-ui/core';
import {
  Star as StarIcon,
  CallSplit as ForkIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
  Code as CodeIcon,
  Person as PersonIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { GET_USER_REPOSITORIES } from '../../services/github/queries';
import {
  UserRepositoriesData,
  UserRepositoriesVariables,
} from '../../types/github';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  headerContent: {
    flex: 1,
  },
  repoCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  pageInfo: {
    margin: theme.spacing(0, 2),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const RepositoryList = () => {
  const classes = useStyles();
  const theme = useTheme();
  //  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [pageSize] = useState(6);

  const username = 'Dey-Sumit';

  const { loading, error, data, fetchMore } = useQuery<
    UserRepositoriesData,
    UserRepositoriesVariables
  >(GET_USER_REPOSITORIES, {
    variables: { login: username, first: pageSize },
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  const repositories = data?.user?.repositories?.edges || [];
  const pageInfo = data?.user?.repositories?.pageInfo;
  const userInfo = data?.user || {};

  const handleNextPage = () => {
    if (!pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
        first: pageSize,
        before: null,
        last: null,
      },
    });
  };

  const handlePrevPage = () => {
    if (!pageInfo?.hasPreviousPage) return;
    fetchMore({
      variables: {
        before: pageInfo.startCursor,
        last: pageSize,
        after: null,
        first: null,
      },
    });
  };

  return (
    <Container className={classes.root}>
      {/* User Header */}
      <Box className={classes.header}>
        <Avatar
          src={userInfo.avatarUrl}
          alt={username}
          className={classes.avatar}
        >
          <PersonIcon />
        </Avatar>
        <Box className={classes.headerContent}>
          <Typography variant="h4" component="h1">
            {username}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {userInfo.bio || `GitHub repositories for ${username}`}
          </Typography>
        </Box>
      </Box>

      <Divider className={classes.divider} />

      <Typography variant="h5" component="h2" gutterBottom>
        <CodeIcon style={{ marginRight: theme.spacing(1) }} />
        Repositories ({data?.user?.repositories?.totalCount || 0})
      </Typography>

      {repositories.length === 0 ? (
        <Typography>No repositories found</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {repositories.map(({ node }) => (
              <Grid item xs={12} sm={6} md={4} key={node.id}>
                <Card variant="outlined" className={classes.repoCard}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" className={classes.repoName}>
                      {node.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.description}
                    >
                      {node.description || 'No description provided'}
                    </Typography>

                    <Box className={classes.statsContainer}>
                      <Box>
                        <Chip
                          icon={<StarIcon fontSize="small" />}
                          label={node.stargazerCount}
                          size="small"
                          className={classes.statChip}
                          variant="outlined"
                        />
                        <Chip
                          icon={<ForkIcon fontSize="small" />}
                          label={node.forkCount}
                          size="small"
                          className={classes.statChip}
                          variant="outlined"
                        />
                      </Box>
                      <Chip
                        label={node.primaryLanguage?.name || 'N/A'}
                        size="small"
                        style={{
                          backgroundColor:
                            node.primaryLanguage?.color ||
                            theme.palette.grey[300],
                          color: theme.palette.getContrastText(
                            node.primaryLanguage?.color ||
                              theme.palette.grey[300]
                          ),
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Controls */}
          <Box className={classes.paginationContainer}>
            <IconButton
              disabled={!pageInfo.hasPreviousPage}
              onClick={handlePrevPage}
              aria-label="Previous page"
            >
              <PrevIcon />
            </IconButton>

            <Typography variant="body2" className={classes.pageInfo}>
              Page {pageInfo?.hasPreviousPage ? pageInfo.startCursor : 1} of{' '}
            </Typography>

            <IconButton
              // disabled={!pageInfo.hasNextPage}
              onClick={handleNextPage}
              aria-label="Next page"
            >
              <NextIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Container>
  );
};

export default RepositoryList;
