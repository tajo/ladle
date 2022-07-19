import * as React from "react";
import { Code, Link } from "./ui";

const NoStories: React.FC<{ wrongUrl?: boolean; activeStory?: string }> = ({
  wrongUrl,
  activeStory,
}) => (
  <div className="ladle-error-content">
    {wrongUrl ? (
      <>
        <h1>The story not found</h1>
        <p>
          The story id <Code>{activeStory}</Code> you are trying to open does
          not exist. Typo?
        </p>
      </>
    ) : (
      <>
        <h1>No stories found</h1>
        <p>
          The configured glob pattern for stories is:{" "}
          <Code>{(import.meta as any).env.VITE_PUBLIC_STORIES}</Code>.{" "}
        </p>
        <p>
          It can be changed through the{" "}
          <Link href="https://www.ladle.dev/docs/config#story-filenames">
            configuration file
          </Link>{" "}
          or CLI flag <Code>--stories=your-glob</Code>.
        </p>
      </>
    )}
    <p>
      <Link href="https://github.com/tajo/ladle">Github</Link>
    </p>
    <p>
      <Link href="https://www.ladle.dev">Docs</Link>
    </p>
  </div>
);

export default NoStories;
