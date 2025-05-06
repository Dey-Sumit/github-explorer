# GitHub Repository Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A production-quality React application that interacts with GitHub's GraphQL API. This project demonstrates clean architecture, proper Git practices, and effective technical debt management.

## 🚀 Features

- List personal GitHub repositories
- View repository details and pull requests
- Create new GitHub repositories
- Modern React with TypeScript
- Clean, maintainable codebase with strict linting rules

## 🛠️ Technology Stack

### Initial Stack
- React 16.10.1
- Apollo Client 3.6.2
- Material-UI 4.12.4
- TypeScript
- Webpack for bundling
- Node.js v16

### Future Upgrades (Planned)
- Migration from Webpack to Vite
- Upgrade to the latest React
- Upgrade to Material-UI v7
- Node.js v18/v20

## 📋 Prerequisites

- Node.js v16.x
- Yarn 1.22.x

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/github-explorer.git
cd github-explorer
```

2. Install dependencies
```bash
yarn install
```

3. Set up your GitHub personal access token
   - Create a `.env` file in the root directory
   - Add your GitHub token: `GITHUB_AUTH_TOKEN=your_token_here`

## 🚀 Development

Run the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`.

## 🧪 Quality Assurance

This project uses several tools to ensure code quality:

### Linting and Formatting
```bash
# Run ESLint
yarn lint

# Fix ESLint issues
yarn lint:fix

# Check code formatting with Prettier
yarn format:check

# Format code with Prettier
yarn format
```

### Type Checking
```bash
# Run TypeScript type checking
yarn typecheck
```

### Pre-commit Hooks
This project uses Husky and lint-staged to run checks before committing:
- ESLint is run on all staged TypeScript files
- Prettier checks formatting on all staged files
- Commits will be blocked if there are any linting or formatting issues

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
├── config/           # App configuration
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API services
│   └── github/       # GitHub GraphQL API
├── types/            # TypeScript types & interfaces
├── utils/            # Utility functions
└── App.tsx           # Main App component
```

## 🌱 Git Workflow

This project follows a structured branching strategy:

- **main**: Production-ready code
- **development**: Active development branch
- **feature/\***: Feature branches created from development
- **fix/\***: Bug fix branches

All feature and fix branches are merged back into development via pull requests, and development is merged into main when ready for production.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.