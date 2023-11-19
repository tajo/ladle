import { useEffect, useState } from "react";
import type { Story } from "@ladle/react";
import { msw } from "@ladle/react";
import { fetchData } from "./utils";

const FETCH_URL = "/todos.json";

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
