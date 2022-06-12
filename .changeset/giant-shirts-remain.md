---
"test-config-ts": major
"@ladle/react": minor
---

Load vite.config.ts the same way as Vite

## WHAT the breaking change is

(Only for the package maintainers) a new E2E packages is added.

## WHY the change was made

Ladle was not able to handle `vite.config.ts` the way Vite does.
For example, Ladle was not able to load `vite.config.ts` which imported other TS modules.

## HOW a consumer should update their code

(Only for the package maintainers) recognize a new e2e workspace with `pnpm install`.
