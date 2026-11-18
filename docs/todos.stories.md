# Module: todos.stories

**File:** `\e2e\msw\src\todos.stories.tsx`

## Overview

Module `todos.stories` contains 0 analyzed entities.

```
import { useEffect, useState } from "react";
import type { Story } from "@ladle/react";
import { msw } from "@ladle/react";
import { fetchData } from "./utils";

// @ts-ignore
const FETCH_URL = `${import.meta.env.BASE_URL}todos.json`;

export const Mocked: Story = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData(FETCH_URL, setTodos);
  }, []);
  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo: { id: number; title: string }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export const Live: Story = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData(FETCH_URL, setTodos);
  }, []);
  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo: { id: number; title: string }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

Mocked.msw = [
  msw.http.get(FETCH_URL, () => {
    return new Response(JSON.stringify([{ id: 1, title: "msw todo" }]), {
      headers: {
        "Content-Type": "application/json",
        "x-msw-bypass": "true",
      },
    });
  }),
];
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 1
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
