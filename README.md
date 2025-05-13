# GitHub Repository Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


A production-quality React application that interacts with GitHub's GraphQL API. This project demonstrates clean architecture, proper Git practices, and effective technical debt management.

## 📌 Live Demos

- **Current Version (v2.0)**: [GitHub Explorer on Vercel](https://github-explorer-wine.vercel.app/) - Experience the upgraded stack with React 19, Material-UI 7, and Vite
- **Initial Version (v1.0)**: [GitHux on Netlify](https://githux.netlify.app/) - See the original implementation with React 16, Material-UI 4, and Webpack

## 🚀 Features

- List personal GitHub repositories with modern grid layout
- Responsive design that works on all device sizes
- Pagination with cursor-based GraphQL implementation
- Repository details with pull requests display
- Create new GitHub repositories
- Modern React with TypeScript
- Clean, maintainable codebase with strict linting rules

## 🛠️ Technology Stack

### Current Stack (v2.0)
- React 19.x with improved performance and concurrent rendering
- Apollo Client 3.6.2 with enhanced caching
- Material-UI 7.x with modern design system
- TypeScript 4.9.5 for type safety
- Vite 6.3.x for faster development and builds (70% faster than Webpack)
- Node.js v20 for improved performance and newer JavaScript features
- React Router v6.x for routing

### Initial Stack (v1.0)
- React 16.10.1
- Apollo Client 3.6.2
- Material-UI 4.12.4
- TypeScript 4.9.5
- Webpack 5.x for bundling
- React Router v5.x for routing
- Node.js v16

To setup the initial version (v1.0), checkout the tagged release:
```bash
git checkout v1.0.0
```

## 📋 Prerequisites

- Node.js v20.x (for current version)
- Yarn 1.22.x or higher
- GitHub Personal Access Token with the following scopes:
  - `repo` (Full control of private repositories)
  - `user` (Read and write user profile data)

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/Dey-Sumit/github-explorer.git
cd github-explorer
```

2. Install dependencies
```bash
yarn install
```

3. Set up your GitHub personal access token
   - Create a `.env` file in the root directory (reference from .env.example)
   - Add your GitHub token:
     - For current stack (v2.0): `VITE_GITHUB_TOKEN=your_token_here`
     - For initial stack (v1.0): `REACT_APP_GITHUB_TOKEN=your_token_here`

## 🚀 Development

Run the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000` with hot module replacement for fast development.

## Scripts Reference

### Current Stack (v2.0)
```bash
# Start the development server
yarn start

# Build for production
yarn build

# Preview production build
yarn preview

# Lint and format code
yarn lint
yarn lint:fix
yarn format

# Type checking
yarn typecheck
```

### Initial Stack (v1.0)
When using the initial version (v1.0.0), the core scripts remain the same but use Webpack:
```bash
# Start the development server
yarn start

# Build for production
yarn build

# Preview production build
yarn preview
```

## 🧪 Quality Assurance

This project uses several tools to ensure code quality:

### Pre-commit Hooks
This project uses Husky and lint-staged to run checks before committing:
- ESLint is run on all staged TypeScript files
- Prettier checks formatting on all staged files
- TypeScript type checking ensures type safety
- Commits will be blocked if there are any linting or formatting issues

The hooks are automatically installed when you run `yarn install` through the `prepare` script.

### Testing
While the project currently focuses on static type checking and linting for quality assurance, the architecture is designed to be testable. Future improvements will include:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing

## 🏗️ Building for Production

```bash
# Build the application
yarn build

# Preview the production build
yarn preview
```

## 📁 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── common/       # Shared UI elements
│   ├── layout/       # Layout components
│   └── features/     # Feature-specific components
│   └── pages/        # Pages components
├── config/           # App configuration
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API services
│   └── github/       # GitHub GraphQL API
│       ├── client.ts # Apollo client configuration
│       ├── queries.ts # GraphQL queries
│       └── mutations.ts # GraphQL mutations
├── types/            # TypeScript types & interfaces
├── utils/            # Utility functions
└── App.tsx           # Main App component
```


## Git Workflow

This project follows a structured Git workflow:

### Branches
- `main`: Production-ready code only
- `development`: Active development branch
- All new features and fixes are developed in feature branches created from `development`

### Workflow Process
1. Create a feature branch from `development`: `git checkout -b feature/your-feature-name`
2. Make your changes and commit them using conventional commit messages
3. Push your branch to GitHub: `git push -u origin feature/your-feature-name`
4. Create a Pull Request to merge into `development`
5. After code review, merge the PR into `development`
6. When ready for release, merge `development` into `main` with proper release notes and Git tags

### Commit Message Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or fixing tests
- `chore:` for tooling and dependency updates

## ❓ Troubleshooting

### Common Issues

1. **GitHub API Rate Limiting**
   - Problem: "API rate limit exceeded" errors
   - Solution: Generate a new Personal Access Token with appropriate scopes or wait until your rate limit resets

2. **Environment Variables Not Loading**
   - Problem: GitHub token not being read by the application
   - Solution:
     - For Vite (v2.0): Make sure your token is prefixed with `VITE_`
     - For CRA (v1.0): Make sure your token is prefixed with `REACT_APP_`
     - Restart the development server after changing environment variables

3. **Type Errors After Updating Dependencies**
   - Problem: TypeScript errors after running `yarn install`
   - Solution: Run `yarn typecheck` to identify specific issues, and update type definitions as needed

4. **Vite Build Issues**
   - Problem: Build fails with module resolution errors
   - Solution: Check for absolute imports or paths that might need to be updated in the `vite.config.ts` file

## 🔮 Future Roadmap

- Add comprehensive test suite with Jest and React Testing Library
- Implement user authentication for accessing private repositories
- Add dark mode theme support
- Implement GitHub Issues management
- Add GitHub Actions integration to view workflows
- Support for organization repositories

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.