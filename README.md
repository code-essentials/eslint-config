# eslint-config

eslint configuration for projects

To install,

0. Install

```bash
pnpm i -D @code-essentials/eslint-config
```

1. Add file `eslint.config.mjs`

```javascript
import { config } from '@code-essentials/eslint-config'

export default config
```

2. Add file `tsconfig.eslint.json`

```json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "outDir": "tmp",
        "rootDir": ".",
    },
    "include": ["src", "src/**/*.spec.ts", "test", "eslint.config.mjs"],
    "exclude": ["node_modules", "dist"],
}
```

3. Add lint scripts in project's `package.json`

```json
{
    "scripts": {
        "prebuild": "npm run lint",
        "lint": "eslint .",
    },
}
```
