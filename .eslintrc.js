module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true // Enable JSX since we're using React
    }
  },
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // React is in the global scope with Next.js so we can ignore.
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
    'react/prop-types': 'off',
    'no-control-regex': 'off'
  },
  plugins: ['import', 'simple-import-sort'],
  globals: {
    React: 'writable'
  }
};
