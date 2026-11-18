# synchronize-head.deleteStyleElement

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\synchronize-head.tsx` (lines 25-30)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function deleteStyleElement(doc: Document, index?: number) {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  if (index != undefined && existingTags[index]) {
    existingTags[index].remove();
  }
}
```

## Docstring

_No docstring provided._

## Source

```
function deleteStyleElement(doc: Document, index?: number) {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  if (index != undefined && existingTags[index]) {
    existingTags[index].remove();
  }
}
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
