const isModifierKeyPressed = (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;

const shouldIgnoreEvent = (event: KeyboardEvent) => {
  const target = (event.target || {}) as HTMLElement;
  if (
    !event.key ||
    target.isContentEditable ||
    (["INPUT", "TEXTAREA"].includes(target.nodeName) &&
      !isModifierKeyPressed(event))
  ) {
    return true;
  }
  return false;
};

// redirecting keyboard events from the iframe to the parent document
// so the global hotkeys work no matter where the focus is
export const redirectKeydown = (event: KeyboardEvent) => {
  if (shouldIgnoreEvent(event)) return;
  const newEvent = new KeyboardEvent("keydown", {
    key: event.key,
    code: event.code,
    keyCode: event.keyCode,
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
  });
  document.dispatchEvent(newEvent);
};

export const redirectKeyup = (event: KeyboardEvent) => {
  if (shouldIgnoreEvent(event)) return;
  const newEvent = new KeyboardEvent("keyup", {
    key: event.key,
    code: event.code,
    keyCode: event.keyCode,
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
  });
  document.dispatchEvent(newEvent);
};
