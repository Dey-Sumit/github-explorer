import { gql } from '@apollo/client';

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories(
    $login: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    user(login: $login) {
      login
      bio
      avatarUrl
      repositories(
        first: $first
        after: $after
        last: $last
        before: $before
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
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
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      url
      stargazerCount
      forkCount
      createdAt
      updatedAt
      pullRequests(first: 10, states: [OPEN, CLOSED, MERGED]) {
        totalCount
        edges {
          node {
            id
            number
            title
            state
            createdAt
            author {
              login
              avatarUrl
            }
            url
          }
        }
      }
    }
  }
`;
