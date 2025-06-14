import { FlatCompat } from '@eslint/eslintrc'
import pluginNext from '@next/eslint-plugin-next'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import parserTypeScript from '@typescript-eslint/parser'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript'
    ]
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@next/next': pluginNext,
      'react': pluginReact,
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
]