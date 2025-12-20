import { test, expect, beforeEach, afterEach } from "vitest";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { createStoryWatcher } from "../lib/cli/story-watcher.js";

// Normalise path separators for cross-platform comparison
const normalisePath = (p: string) => p.replace(/\\/g, "/");

// ============================================
// Integration tests for createStoryWatcher
// ============================================

let tempDir: string;

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ladle-watcher-test-"));
  // Create a stories subdirectory
  await fs.mkdir(path.join(tempDir, "stories"), { recursive: true });
});

afterEach(async () => {
  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
});

test("createStoryWatcher detects new story file", async () => {
  const watcher = createStoryWatcher(
    normalisePath(path.join(tempDir, "stories/**/*.stories.tsx")),
  );
  const addedFiles: string[] = [];

  watcher.on("add", (filePath) => {
    addedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Create a new story file
  const storyPath = path.join(tempDir, "stories", "Button.stories.tsx");
  await fs.writeFile(storyPath, 'export const Button = () => "Hello";');

  // Wait for the watcher to detect the file
  await new Promise<void>((resolve) => setTimeout(resolve, 200));

  await watcher.close();

  expect(addedFiles.length).toBe(1);
  expect(normalisePath(addedFiles[0])).toBe(normalisePath(storyPath));
});

test("createStoryWatcher ignores non-story files", async () => {
  const watcher = createStoryWatcher(
    normalisePath(path.join(tempDir, "stories/**/*.stories.tsx")),
  );
  const addedFiles: string[] = [];

  watcher.on("add", (filePath) => {
    addedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Create a non-story file
  const regularFile = path.join(tempDir, "stories", "utils.ts");
  await fs.writeFile(regularFile, 'export const foo = "bar";');

  // Wait a bit to ensure the watcher had time to process
  await new Promise<void>((resolve) => setTimeout(resolve, 200));

  await watcher.close();

  expect(addedFiles.length).toBe(0);
});

test("createStoryWatcher detects story file deletion", async () => {
  // Create the story file first
  const storyPath = path.join(tempDir, "stories", "Button.stories.tsx");
  await fs.writeFile(storyPath, 'export const Button = () => "Hello";');

  const watcher = createStoryWatcher(
    normalisePath(path.join(tempDir, "stories/**/*.stories.tsx")),
  );
  const deletedFiles: string[] = [];

  watcher.on("unlink", (filePath) => {
    deletedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Delete the story file
  await fs.unlink(storyPath);

  // Wait for the watcher to detect the deletion
  await new Promise<void>((resolve) => setTimeout(resolve, 200));

  await watcher.close();

  expect(deletedFiles.length).toBe(1);
  expect(normalisePath(deletedFiles[0])).toBe(normalisePath(storyPath));
});

test("createStoryWatcher detects story file changes", async () => {
  // Create the story file first
  const storyPath = path.join(tempDir, "stories", "Button.stories.tsx");
  await fs.writeFile(storyPath, 'export const Button = () => "Hello";');

  const watcher = createStoryWatcher(
    normalisePath(path.join(tempDir, "stories/**/*.stories.tsx")),
  );
  const changedFiles: string[] = [];

  watcher.on("change", (filePath) => {
    changedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Modify the story file
  await fs.writeFile(storyPath, 'export const Button = () => "World";');

  // Wait for the watcher to detect the change
  await new Promise<void>((resolve) => setTimeout(resolve, 200));

  await watcher.close();

  expect(changedFiles.length).toBe(1);
  expect(normalisePath(changedFiles[0])).toBe(normalisePath(storyPath));
});

test("createStoryWatcher handles multiple patterns (array)", async () => {
  // Create additional directory
  await fs.mkdir(path.join(tempDir, "components"), { recursive: true });

  const watcher = createStoryWatcher([
    normalisePath(path.join(tempDir, "stories/**/*.stories.tsx")),
    normalisePath(path.join(tempDir, "components/**/*.stories.tsx")),
  ]);
  const addedFiles: string[] = [];

  watcher.on("add", (filePath) => {
    addedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Create story files in both directories
  const storyPath1 = path.join(tempDir, "stories", "Story1.stories.tsx");
  const storyPath2 = path.join(tempDir, "components", "Story2.stories.tsx");
  await fs.writeFile(storyPath1, 'export const Story1 = () => "One";');
  await fs.writeFile(storyPath2, 'export const Story2 = () => "Two";');

  // Wait for the watcher to detect the files
  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  await watcher.close();

  expect(addedFiles.length).toBe(2);
  expect(addedFiles.map(normalisePath)).toContain(normalisePath(storyPath1));
  expect(addedFiles.map(normalisePath)).toContain(normalisePath(storyPath2));
});

test("createStoryWatcher detects stories in nested directories", async () => {
  // Create nested directory structure
  await fs.mkdir(path.join(tempDir, "stories", "buttons", "primary"), {
    recursive: true,
  });

  const watcher = createStoryWatcher(
    normalisePath(path.join(tempDir, "stories/**/*.stories.tsx")),
  );
  const addedFiles: string[] = [];

  watcher.on("add", (filePath) => {
    addedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Create a story file in a nested directory
  const storyPath = path.join(
    tempDir,
    "stories",
    "buttons",
    "primary",
    "PrimaryButton.stories.tsx",
  );
  await fs.writeFile(storyPath, 'export const PrimaryButton = () => "Click";');

  // Wait for the watcher to detect the file
  await new Promise<void>((resolve) => setTimeout(resolve, 200));

  await watcher.close();

  expect(addedFiles.length).toBe(1);
  expect(normalisePath(addedFiles[0])).toBe(normalisePath(storyPath));
});

test("createStoryWatcher matches all story file extensions", async () => {
  // Use a proper story glob pattern (like the default config)
  const watcher = createStoryWatcher(
    normalisePath(
      path.join(tempDir, "stories/**/*.stories.{js,jsx,ts,tsx,mdx}"),
    ),
  );
  const addedFiles: string[] = [];

  watcher.on("add", (filePath) => {
    addedFiles.push(filePath);
  });

  // Wait for watcher to be ready
  await new Promise<void>((resolve) => watcher.on("ready", resolve));

  // Create story files with different extensions
  const extensions = ["js", "jsx", "ts", "tsx", "mdx"];
  for (const ext of extensions) {
    const storyPath = path.join(tempDir, "stories", `Test.stories.${ext}`);
    await fs.writeFile(storyPath, `// ${ext} story file`);
  }

  // Create non-story files that should be ignored
  await fs.writeFile(
    path.join(tempDir, "stories", "utils.ts"),
    "// utility file",
  );
  await fs.writeFile(
    path.join(tempDir, "stories", "Button.tsx"),
    "// component file",
  );

  // Wait for the watcher to detect the files
  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  await watcher.close();

  // Should detect all 5 story files but not the 2 non-story files
  expect(addedFiles.length).toBe(5);
  for (const ext of extensions) {
    expect(
      addedFiles.some((f) => f.endsWith(`Test.stories.${ext}`)),
    ).toBeTruthy();
  }
});
