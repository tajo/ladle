import { config } from "virtual:generated-list";
import { Code, Link } from "./ui";

const NoStories = () => (
  <div className="ladle-error-content">
    <h1>No stories found</h1>
    <p>
      The configured glob pattern for stories is: <Code>{config.stories}</Code>.
    </p>
    <p>
      It can be changed through the{" "}
      <Link href="https://www.ladle.dev/docs/config#story-filenames">
        configuration file
      </Link>{" "}
      or CLI flag <Code>--stories=your-glob</Code>.
    </p>
    <p>
      <Link href="https://github.com/tajo/ladle">Github</Link>
    </p>
    <p>
      <Link href="https://www.ladle.dev">Docs</Link>
    </p>
  </div>
);

export default NoStories;
