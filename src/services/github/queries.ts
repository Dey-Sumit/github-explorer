import { gql } from '@apollo/client';

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($login: String!, $first: Int!, $after: String) {
    user(login: $login) {
      repositories(
        first: $first
        after: $after
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            description
            url
            stargazerCount
            forkCount
            updatedAt
          }
        }
      }
    }
  }
`;
export const GET_REPOSITORY_PULL_REQUESTS = gql`
  query GetRepositoryPullRequests(
    $owner: String!
    $name: String!
    $first: Int!
  ) {
    repository(owner: $owner, name: $name) {
      pullRequests(
        first: $first
        states: [OPEN, CLOSED]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        edges {
          node {
            id
            number
            title
            url
            state
            createdAt
            author {
              login
            }
          }
        }
      }
    }
  }
`;
