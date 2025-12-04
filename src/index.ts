import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint, { FlatConfig } from 'typescript-eslint';

/**
 * ```typescript
 * // in eslint.config.mjs
 * import { config } from '@code-essentials/eslint-config'
 * export default config
 * ```
 */
export const config = defineConfig(
    {
        // 1. Ignore build artifacts to prevent 'not found by project service' errors
        //    for files like dist/index.d.ts and dist/index.js.
        ignores: ['dist/', 'node_modules/'],
    },
    eslint.configs.recommended,
    tseslint.configs.base,
    ...tseslint.configs.recommendedTypeChecked.map(cfg => ({
        ...cfg,
        // CRITICAL: Only apply type-checked rules to source code files.
        files: ['**/*.ts', '**/*.tsx'],
        
        languageOptions: {
            ...(<FlatConfig.Config>cfg).languageOptions,
            parserOptions: {
                // NOTE: This assumes 'tsconfig.eslint.json' is located in the consuming project's root.
                project: ['./tsconfig.eslint.json'],
                // Set the root directory to the consuming project's CWD
                tsconfigRootDir: process.cwd(),
            },
        },
    })),
)
