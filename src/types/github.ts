export interface UserRepositoriesVariables {
  login: string;
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}

export interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
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
  login: string;
  bio: string | null;
  avatarUrl: string;
  repositories: RepositoriesConnection;
}

export interface UserRepositoriesData {
  user: User | null;
}

export interface CreateRepositoryResponse {
  createRepository: {
    repository: {
      id: string;
      name: string;
      description?: string;
      url: string;
    };
  };
}
