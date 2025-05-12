/**
 * Application route constants
 * Using constants for routes helps maintain consistency and makes updates easier
 */

export const ROUTES = {
  // Main routes
  HOME: '/',
  REPOSITORY_NEW: '/new',
  REPOSITORY_DETAIL: '/repository/:name',

  // Helper functions for parameterized routes
  getRepositoryDetailPath: (name: string) => `/repository/${name}`,

  // Default route for 404 handling - redirects to home
  NOT_FOUND: '*',
} as const;

// Type for route keys - useful with TypeScript for autocompletion
export type RouteKey = keyof typeof ROUTES;
