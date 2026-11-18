# Architecture: ladle

## What this project is
Ladle is a development environment for building and testing React components. It provides a rich set of tools and utilities to streamline the development process.

## How it is laid out
The project is organized into several directories, each serving a specific purpose:
- `packages/ladle/lib/app/`: Contains the core application logic.
- `e2e/`: Houses end-to-end tests and their supporting files.
- `type-tests/`: Includes type test cases to ensure type safety.

## Key modules
| Name | Path | Commits | Bug Fixes |
|------|------|---------|-----------|
| exports | packages/ladle/lib/app/exports.ts | 28 | 2 |
| types | packages/ladle/lib/shared/types.ts | 22 | 3 |
| args-provider | packages/ladle/lib/app/src/args-provider.tsx | 18 | 3 |
| app | packages/ladle/lib/app/src/app.tsx | 14 | 2 |
| control | packages/ladle/lib/app/src/addons/control.tsx | 14 | 1 |
| story | packages/ladle/lib/app/src/story.tsx | 13 | 5 |
| controls.stories | e2e/addons/src/controls.stories.tsx | 12 | 1 |
| compose-enhancers | packages/ladle/lib/app/src/compose-enhancers.tsx | 11 | 4 |
| history | packages/ladle/lib/app/src/history.ts | 9 | 1 |
| source | packages/ladle/lib/app/src/addons/source.tsx | 9 | 1 |
| tree-view | packages/ladle/lib/app/src/sidebar/tree-view.tsx | 8 | 0 |
| argTypes.test | type-tests/argTypes.test.tsx | 6 | 1 |
| generated-list.d | packages/ladle/types/generated-list.d.ts | 5 | 0 |
| get-config | packages/ladle/lib/app/src/get-config.ts | 5 | 0 |
| main | packages/ladle/lib/app/src/sidebar/main.tsx | 5 | 0 |
| ui | packages/ladle/lib/app/src/ui.tsx | 5 | 3 |
| args.stories | e2e/decorators/src/args.stories.tsx | 4 | 0 |
| icons | packages/ladle/lib/app/src/icons.tsx | 4 | 0 |
| ladle | packages/ladle/lib/app/src/addons/ladle.tsx | 4 | 0 |
| reducer | packages/ladle/lib/app/src/reducer.ts | 4 | 1 |
| story-name | packages/ladle/lib/app/src/story-name.ts | 4 | 0 |
| theme | packages/ladle/lib/app/src/addons/theme.tsx | 4 | 0 |
| a11y | packages/ladle/lib/app/src/addons/a11y.tsx | 3 | 0 |
| addon-panel | packages/ladle/lib/app/src/addon-panel.tsx | 3 | 1 |
| args.test | type-tests/args.test.tsx | 3 | 0 |
| hello.show | e2e/config/src/hello.show.tsx | 3 | 0 |
| hello.stories | e2e/addons/src/hello.stories.tsx | 3 | 1 |
| hmr.stories | e2e/provider/src/hmr.stories.tsx | 3 | 1 |
| mode | packages/ladle/lib/app/src/addons/mode.tsx | 3 | 0 |
| msw | packages/ladle/lib/app/src/msw.tsx | 3 | 1 |
| my-story--sec.stories | packages/example/src/my-story--sec.stories.tsx | 3 | 0 |
| no-stories | packages/ladle/lib/app/src/no-stories.tsx | 3 | 1 |
| no-stories-error | packages/ladle/lib/app/src/no-stories-error.tsx | 3 | 0 |
| params.stories | e2e/decorators/src/params.stories.tsx | 3 | 0 |
| posts.stories | e2e/msw/src/posts.stories.tsx | 3 | 1 |
| rtl | packages/ladle/lib/app/src/addons/rtl.tsx | 3 | 0 |
| synchronize-head | packages/ladle/lib/app/src/synchronize-head.tsx | 3 | 0 |
| todos.stories | e2e/msw/src/todos.stories.tsx | 3 | 1 |
| width | packages/ladle/lib/app/src/addons/width.tsx | 3 | 0 |
| a11y.stories | e2e/addons/src/a11y.stories.tsx | 2 | 0 |

## Public API surface
The project exposes several entry points, including:
- `exports`: Provides the main exports for the application.
- `types`: Defines shared types used throughout the project.
- `args-provider`: Manages argument providers for components.
- `app`: The core application component.
- `control`: Provides control components for the application.

## Hotspots and gotchas
The following modules have the highest churn and the most bug-fix