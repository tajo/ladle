import { Link } from "./ui";

const NoStoriesError = ({ error }: { error: string }) => {
  console.log(error);
  return (
    <div className="ladle-error-content">
      <h1>SyntaxError when parsing stories ❌</h1>
      <pre>{error}</pre>
      <p>Check the terminal for more info.</p>
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
