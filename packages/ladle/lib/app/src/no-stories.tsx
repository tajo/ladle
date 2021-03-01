import config from "./get-config";
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
          The story id <Code>{activeStory}</Code> you are trying to open doesn't
          exist. Typo?
        </p>
      </>
    ) : (
      <>
        <h1>No stories found</h1>
        <p>
          Please create a file matching the glob <Code>{config.stories}</Code>.{" "}
        </p>
      </>
    )}
    <p>
      <Link href="https://github.com/tajo/ladle">More information</Link>.
    </p>
  </div>
);

export default NoStories;
