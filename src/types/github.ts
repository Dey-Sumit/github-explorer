export interface UserRepositoriesVariables {
  login: string;
  first: number;
  after?: string | null;
}

interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
}

interface RepositoryEdge {
  node: Repository;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface RepositoriesConnection {
  totalCount: number;
  pageInfo: PageInfo;
  edges: RepositoryEdge[];
}

interface User {
  repositories: RepositoriesConnection;
}

export interface UserRepositoriesData {
  user: User | null;
}
