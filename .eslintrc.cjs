const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname

      },
    },
  },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/jest-react'),
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@tanstack/query'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.{ts,tsx}', 'setup-tests.ts', '**/*.test-utils.ts', './src/utils/tests.tsx'],
      },
    ],
    "react/prop-types": "off",
  },
};
