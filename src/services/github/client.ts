import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';

// Dev environment detection
const isDev = process.env.NODE_ENV === 'development';

// Custom logging link (dev only)
const loggingLink = new ApolloLink((operation, forward) => {
  if (isDev) {
    // Log the operation details
    const { operationName } = operation;
    console.group(`🚀 Apollo GraphQL: ${operationName}`);
    console.log('Query:', operation.query);
    console.log('Variables:', operation.variables);
    console.groupEnd();
  }

  // Call the next link in the chain
  return forward(operation).map(result => {
    if (isDev) {
      // Log the result
      console.group(`✅ Apollo GraphQL Result: ${operation.operationName}`);
      console.log('Data:', result.data);
      console.log('Errors:', result.errors);
      console.groupEnd();
    }
    return result;
  });
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (isDev) {
    if (graphQLErrors) {
      console.group(`❌ GraphQL Errors for: ${operation.operationName}`);
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
      console.groupEnd();
    }

    if (networkError) {
      console.group('❌ Network Error');
      console.error(`[Network error]: ${networkError}`);
      console.groupEnd();
    }
  }
});

// Retry link with exponential backoff and jitter
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: error => !!error && error.statusCode !== 400,
  },
});

// GitHub GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

// Authentication link
const authLink = setContext((_, { headers }) => {
  const token =
    process.env.REACT_APP_GITHUB_TOKEN ||
    localStorage.getItem('github_token') ||
    '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Combine all links in proper order
// The order is important! Links execute from left to right
const link = ApolloLink.from([
  isDev
    ? loggingLink
    : new ApolloLink((operation, forward) => forward(operation)), // Only include logging in dev
  errorLink,
  retryLink,
  authLink,
  httpLink,
]);

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ['login'],
      fields: {
        repositories: {
          keyArgs: ['orderBy'],
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const githubClient = new ApolloClient({
  link,
  cache,
  ...(isDev && {
    connectToDevTools: true,
    defaultOptions: {
      query: {
        // In dev, include more information in error messages
        errorPolicy: 'all',
      },
    },
  }),
});

export default githubClient;
