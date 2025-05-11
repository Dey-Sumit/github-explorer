import { gql } from '@apollo/client';

export const CREATE_REPOSITORY = gql`
  mutation CreateRepository($input: CreateRepositoryInput!) {
    createRepository(input: $input) {
      repository {
        id
        name
        url
        description
        createdAt
      }
    }
  }
`;
