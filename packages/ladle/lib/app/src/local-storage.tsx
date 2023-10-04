export type Settings = {
  appId?: string;
  sidebarWidth?: number;
};

// @ts-ignore
const APP_ID = import.meta.env.VITE_LADLE_APP_ID;
const storageKey = `ladle-settings-${APP_ID}`;
const defaultValue = { appId: APP_ID };

export const updateSettings = (settings: Settings) => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  localStorage.setItem(
    storageKey,
    JSON.stringify({ ...storageSettings, ...settings }),
  );
};

export const getSettings = (): Settings => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  return storageSettings as Settings;
};
