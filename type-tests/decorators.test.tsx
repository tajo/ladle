import type { Story, StoryDecorator } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

const decorator: StoryDecorator<FooProps> = (Component) => (
  <div>
    <Component />
  </div>
);

export const Decorators: Story<FooProps> = Foo;

Decorators.decorators = [decorator];

const decoratorWithNoProps: StoryDecorator = (Component) => (
  <div>
    <Component />
  </div>
);

export const DecoratorsWithNoProps: Story<FooProps> = Foo;

Decorators.decorators = [decoratorWithNoProps];
