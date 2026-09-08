import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const sharedRules = {
  ...js.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  'no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_',
    ignoreRestSiblings: true,
  }],
  // React 18 effects legitimately synchronize browser API state after mount.
  // The stricter compiler-oriented rule is not applicable until a React 19 migration.
  'react-hooks/set-state-in-effect': 'off',
}

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...sharedRules,
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    },
  },
  {
    files: [
      'src/context/AppContext.jsx',
      'src/components/UI/Button.jsx',
      'src/components/Controls/KeyboardShortcutsModal.jsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['scripts/**/*.mjs', '*.config.js', 'tests/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: sharedRules,
  },
  {
    files: ['public/sw.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: globals.serviceworker,
    },
    rules: js.configs.recommended.rules,
  },
]
