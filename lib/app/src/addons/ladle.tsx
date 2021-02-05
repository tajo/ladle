import { Ladle } from "../icons";

export const Button: React.FC<{}> = () => {
  return (
    <li>
      <button
        aria-label="Get more information about Ladle."
        title="Get more information about Ladle."
        onClick={() => {}}
      >
        <Ladle />
        <label>About Ladle</label>
      </button>
    </li>
  );
};
