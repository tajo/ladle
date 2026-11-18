# story-name.addIntoTree

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 33-65)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
    _tree: StoryTree,
    parts: string[],
    selectedParts: string[],
    id: string,
  ) => {
    const first = parts.shift();
    let isExpanded = allExpanded ? true : false;
    let passSelectedParts: string[] = [];
    if (selectedParts[0] === first) {
      passSelectedParts = [...selectedParts.slice(1)];
      isExpanded = true;
    }
    const itemIndex = _tree.findIndex((item) => item.subId === first);
    if (!first) return;
    if (itemIndex === -1) {
      _tree.push({
        id: `${id}${first}`,
        subId: first,
        name: capitalize(first.replace(/-/g, " ")),
        isLinkable: parts.length === 0,
        isExpanded,
        isFocused: false,
        children: [],
      });
    }
    addIntoTree(
      _tree[itemIndex > -1 ? itemIndex : _tree.length - 1].children,
      parts,
      passSelectedParts,
      `${id}${first}--`,
    );
  }
```

## Docstring

_No docstring provided._

## Source

```
  const addIntoTree = (
    _tree: StoryTree,
    parts: string[],
    selectedParts: string[],
    id: string,
  ) => {
    const first = parts.shift();
    let isExpanded = allExpanded ? true : false;
    let passSelectedParts: string[] = [];
    if (selectedParts[0] === first) {
      passSelectedParts = [...selectedParts.slice(1)];
      isExpanded = true;
    }
    const itemIndex = _tree.findIndex((item) => item.subId === first);
    if (!first) return;
    if (itemIndex === -1) {
      _tree.push({
        id: `${id}${first}`,
        subId: first,
        name: capitalize(first.replace(/-/g, " ")),
        isLinkable: parts.length === 0,
        isExpanded,
        isFocused: false,
        children: [],
      });
    }
    addIntoTree(
      _tree[itemIndex > -1 ? itemIndex : _tree.length - 1].children,
      parts,
      passSelectedParts,
      `${id}${first}--`,
    );
  };
```

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
