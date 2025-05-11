module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: '16.10.1',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even if it doesn't contain any source code
      },
    },
  },
  rules: {
    // Prettier
    'prettier/prettier': ['error'],

    // TypeScript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // React
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',

    // Import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',

    // General
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      // Only apply TypeScript rules to actual TS files
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'no-undef': 'off', // TypeScript already handles this
      },
    },
    {
      files: ['*.config.js', 'webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
