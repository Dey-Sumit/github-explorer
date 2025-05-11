import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_REPOSITORY } from '@/services/github/mutations';
import { CreateRepositoryResponse } from '@/types/github.types';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
}));

interface CreateRepositoryVariables {
  input: {
    name: string;
    description?: string;
  };
}

const CreateRepository: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formState, setFormState] = useState({
    name: '',
    description: '',
  });

  const [createRepository, { loading, error }] = useMutation<
    CreateRepositoryResponse,
    CreateRepositoryVariables
  >(CREATE_REPOSITORY, {
    onCompleted: data => {
      // Redirect to repository detail
      if (data?.createRepository?.repository?.id) {
        history.push(`/repository/${data.createRepository.repository.name}`);
      } else {
        history.push('/');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createRepository({
      variables: {
        input: {
          name: formState.name,
          description: formState.description || undefined,
        },
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Box className={classes.header}>
        <Typography variant="h4" component="h1">
          Create a new repository
        </Typography>
        <Typography variant="body1" color="textSecondary">
          A repository contains all project files, including the revision
          history.
        </Typography>
      </Box>

      <Paper className={classes.paper} elevation={1}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Repository name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            placeholder="my-awesome-repo"
            helperText="Great repository names are short and memorable."
          />

          <TextField
            label="Description (optional)"
            name="description"
            value={formState.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            multiline
            rows={2}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading || !formState.name}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Create repository
          </Button>
        </form>
      </Paper>

      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">
            Error creating repository: {error.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default CreateRepository;
