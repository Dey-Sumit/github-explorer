import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  styled,
} from '@mui/material';
import { CREATE_REPOSITORY } from '@/services/github/mutations';
import { CreateRepositoryResponse } from '@/types/github.types';
import { ROUTES } from '@/routes/constants';

const Container = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  margin: '0 auto',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const FormContent = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
}));

interface CreateRepositoryVariables {
  input: {
    name: string;
    description?: string;
  };
}

const CreateRepository: React.FC = () => {
  const navigate = useNavigate();

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
        navigate(
          ROUTES.getRepositoryDetailPath(data.createRepository.repository.name)
        );
      } else {
        navigate(ROUTES.HOME);
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
    <Container>
      <HeaderContainer>
        <PageTitle variant="h4">Create a new repository</PageTitle>
        <Typography variant="body1" color="text.secondary">
          A repository contains all project files, including the revision
          history.
        </Typography>
      </HeaderContainer>

      <FormContainer elevation={0}>
        <FormContent onSubmit={handleSubmit}>
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
            InputProps={{
              sx: {
                backgroundColor: 'background.paper',
              },
            }}
          />

          <TextField
            label="Description (optional)"
            name="description"
            value={formState.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            multiline
            minRows={2}
            InputProps={{
              sx: {
                backgroundColor: 'background.paper',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading || !formState.name}
            sx={{
              mt: 2,
              alignSelf: 'flex-start',
              px: 3,
            }}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Create repository
          </Button>
        </FormContent>
      </FormContainer>

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
