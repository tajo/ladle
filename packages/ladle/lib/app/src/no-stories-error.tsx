/* eslint-disable react/no-unescaped-entities */
import type * as React from "react";
import { Link } from "./ui";

const NoStoriesError: React.FC<{ error: string }> = ({ error }) => {
  console.log(error);
  return (
    <div className="ladle-error-content">
      <h1>❌ Error when discovering stories ❌</h1>
      <pre>{error}</pre>
      <p>
        <Link href="https://ladle.dev/docs/stories#limitations">
          More information.
        </Link>
      </p>
      <p>
        <strong>Please restart Ladle after fixing this issue.</strong>
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
