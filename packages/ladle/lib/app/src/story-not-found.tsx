import { Code, Link } from "./ui";

const StoryNotFound = ({ activeStory }: { activeStory: string }) => (
  <div className="ladle-error-content">
    <h1>Story not found</h1>
    <p>
      The story id <Code>{activeStory}</Code> you are trying to open does not
      exist. Typo?
    </p>
    <p>
      <Link href="/">Back to home</Link>
    </p>
    <p>
      <Link href="https://github.com/tajo/ladle">GitHub</Link>
    </p>
    <p>
      <Link href="https://www.ladle.dev">Docs</Link>
    </p>
  </div>
);

export default StoryNotFound;
