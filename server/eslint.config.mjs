// eslint.config.mjs
export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'module', // NestJS використовує ES modules
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // Prettier - NESTJS FRIENDLY
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          trailingComma: 'none', // <- Для NestJS декораторів
          printWidth: 100, // <- Комфортна ширина
          singleQuote: true, // <- Стиль NestJS
          tabWidth: 2,
          useTabs: false,
          semi: true,
          bracketSpacing: true,
          arrowParens: 'always', // <- (x) => x, а не x => x
          proseWrap: 'preserve',
          htmlWhitespaceSensitivity: 'css',
          embeddedLanguageFormatting: 'auto'
        }
      ]
    }
  }
);
