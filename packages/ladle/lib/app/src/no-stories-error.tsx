/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { Code, Link } from "./ui";

const NoStoriesError: React.FC<{ error: string }> = ({ error }) => {
  console.log(error);
  return (
    <div className="ladle-error-content">
      <h1>❌ Error when discovering stories ❌</h1>
      <pre>{error}</pre>
      <p>
        <strong>Please restart Ladle, after fixing this issue.</strong>
      </p>
      <h2>General limitations</h2>
      <p>
        There are <b>some limitations</b> when it comes to the syntax of
        stories:
      </p>
      <ul>
        <li>
          <Code>storyName</Code> and the default <Code>title</Code> need to be a
          string literals. <Code>Story.storyName = "Renamed"</Code> is fine but{" "}
          <Code>Story.storyName = "Renamed" + "Oof"</Code> not.
        </li>
        <li>
          File names and named exports (or storyNames) are normalized and used
          together as an unique identifier for each story. There cannot be two
          stories with the same ID. Please, rename your stories or story files.
        </li>
        <li>
          <Code>meta</Code> parameter needs to be serializable so it can be
          shared through the{" "}
          <Link href="https://ladle.dev/docs/meta">meta.json</Link> file.
        </li>
      </ul>
      <p>
        These limitations are in place to support some features like the
        automatic code-splitting and meta file.
      </p>
      <p>
        <Link href="https://github.com/tajo/ladle">Github</Link>
      </p>
      <p>
        <Link href="https://www.ladle.dev">Docs</Link>
      </p>
    </div>
  );
};

export default NoStoriesError;
