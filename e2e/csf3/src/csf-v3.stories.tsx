import type { StoryDefault } from "@ladle/react";

// CSF v3 fixture coverage for compose-enhancers.tsx (#602).
// Storybook's Component Story Format v3 (the default since Storybook 7, 2023)
// describes a story as a plain object: { args?, render?, ... }. Ladle 5.1.1
// historically only handled CSF v2 (named export = React.FC with .args /
// .argTypes / .decorators attached as function properties), so passing a
// plain object to ArgsProvider's React.createElement(component, props) threw
// "Element type is invalid: expected a string ... but got: object".
//
// The composeEnhancers fix resolves a real component before passing it to
// ArgsProvider. These stories exercise the four CSF v3 shapes the fix
// supports:
//   1. args-only with meta.component (meta.component fallback path)
//   2. render-only (renderFn wrapping path)
//   3. render+args (renderFn receives merged args)
//   4. empty (defensive fallback path; meta.component takes over here)
//
// Note on types: Ladle's `Story<P>` extends `React.FC<P>`, so the CSF v3
// object shape can't be typed with Ladle's own `Story` export. These
// fixtures use plain object literals (matching what Storybook codebases
// produce when they import `StoryObj` from `@storybook/react`).

type GreeterProps = {
  name: string;
  greeting?: string;
};

const Greeter = ({ name, greeting = "Hello" }: GreeterProps) => (
  <p data-testid="greeter">
    {greeting}, {name}!
  </p>
);

export default {
  title: "csf-v3",
  component: Greeter,
  args: {
    name: "world",
  },
} satisfies StoryDefault<GreeterProps> & { component: typeof Greeter };

// CSF v3 args-only — relies on `meta.component` fallback.
export const ArgsOnly = {
  args: {
    name: "args-only",
  },
};

// CSF v3 render-only — exercises the renderFn wrapping path.
export const RenderOnly = {
  render: () => <p data-testid="render-only">render-only output</p>,
};

// CSF v3 render + args — render receives merged args.
export const RenderWithArgs = {
  args: {
    name: "render-with-args",
    greeting: "Hi",
  },
  render: (args: GreeterProps) => (
    <p data-testid="render-with-args">
      {args.greeting}, {args.name}!
    </p>
  ),
};

// CSF v3 empty — defensive fallback path; `meta.component` takes over.
export const Empty = {};
