import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import hooks from 'eslint-plugin-react-hooks';
import babelParser from "@babel/eslint-parser";

// Atribua a uma variável para evitar o erro
const eslintConfig = [
  // Configuração base
  js.configs.recommended,

  // Configuração do React
  {
    ...react.configs.flat.recommended,
    files: ['**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Configuração principal
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        React: 'readonly',
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },

    plugins: {
      prettier,
      react,
      'react-hooks': hooks,
    },

    rules: {
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier
      'prettier/prettier': 'error',

      // React
      'react/jsx-filename-extension': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Formatação
      semi: 'off',
      quotes: 'off',
      indent: 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'arrow-parens': 'off',
      'function-paren-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'operator-linebreak': 'off',
      'no-case-declarations': 'off',


      // Console
      'no-console': 'warn',
    },
  },
];

export default eslintConfig;
