# dialog.runTimeout

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 77-102)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal environments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was later defined
  if (
    (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
    setTimeout
  ) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. madness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopefully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
```

## Docstring

_No docstring provided._

## Source

```
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal environments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was later defined
  if (
    (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
    setTimeout
  ) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. madness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopefully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
