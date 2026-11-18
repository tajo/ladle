# synchronize-head.addStyleElement

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\synchronize-head.tsx` (lines 11-23)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function addStyleElement(rule: string, doc: Document, index?: number): number {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  const tag = doc.createElement("style");
  tag.setAttribute(CSS_ATTR, "true");
  tag.appendChild(doc.createTextNode(rule));
  if (index && existingTags[index]) {
    existingTags[index].after(tag);
    return index + 1;
  } else {
    doc.head.appendChild(tag);
    return existingTags.length;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
function addStyleElement(rule: string, doc: Document, index?: number): number {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  const tag = doc.createElement("style");
  tag.setAttribute(CSS_ATTR, "true");
  tag.appendChild(doc.createTextNode(rule));
  if (index && existingTags[index]) {
    existingTags[index].after(tag);
    return index + 1;
  } else {
    doc.head.appendChild(tag);
    return existingTags.length;
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
