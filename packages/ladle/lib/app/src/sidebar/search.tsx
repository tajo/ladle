import { forwardRef, useEffect } from "react";
import { Search } from "../icons";

interface SearchInputProps {
  value: string;
  onChange(search: string): void;
  treeRoot: React.MutableRefObject<HTMLUListElement | null>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, treeRoot, inputRef }, ref) => {
    const handleKeyDown: React.KeyboardEventHandler = (e) => {
      if (e.key === "ArrowDown") {
        (treeRoot as any).current.firstChild.focus();
      }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
      onChange(e.target.value);

    useEffect(() => {
      const openStorySelector = ({
        metaKey,
        key,
        target,
        preventDefault,
      }: KeyboardEvent) => {
        if ((metaKey && key === "p") || key === "/") {
          const eventOnAnInputTag = ["input", "textarea"].every(
            (el) => (target as any)?.tagName.toLowerCase() !== el,
          );

          if (eventOnAnInputTag || metaKey) {
            (inputRef.current as any as HTMLInputElement).focus();
            preventDefault();
          }
        }
      };

      // Using keyup instead of keydown helps preventing an `/` to be input
      document.addEventListener("keyup", openStorySelector);

      return () => document.removeEventListener("keyup", openStorySelector);
    }, []);

    return (
      <div className="ladle-search">
        <input
          ref={ref}
          placeholder="Search"
          aria-label="Search stories"
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <Search />
        <span className="ladle-shortcut">/</span>
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export default SearchInput;
