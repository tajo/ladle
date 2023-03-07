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

const decoratorWithValidProps: StoryDecorator<FooProps> = (Component) => (
  <div>
    <Component foo="foo" />
  </div>
);

export const DecoratorsWithOptionalProps: Story<FooProps> = Foo;

DecoratorsWithOptionalProps.decorators = [decoratorWithValidProps];

const decoratorWithInvalidProps: StoryDecorator<FooProps> = (Component) => (
  <div>
    {/* @ts-expect-error - 5 is a number, foo is a string */}
    <Component foo={5} />
  </div>
);

export const DecoratorsWithInvalidProps: Story<FooProps> = Foo;

DecoratorsWithInvalidProps.decorators = [decoratorWithInvalidProps];

const decoratorWithNoProps: StoryDecorator = (Component) => (
  <div>
    <Component />
  </div>
);

export const DecoratorsWithNoProps: Story<FooProps> = Foo;

Decorators.decorators = [decoratorWithNoProps];
