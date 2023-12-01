import { useEffect, useState } from "react";
import type { Story } from "@ladle/react";
import { msw } from "@ladle/react";
import { fetchData } from "./utils";

// @ts-ignore
const FETCH_URL = `${import.meta.env.BASE_URL}posts.json`;

export const Mocked: Story = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData(FETCH_URL, setPosts);
  }, []);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export const Replaced: Story = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData(FETCH_URL, setPosts);
  }, []);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export const Live: Story = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData(FETCH_URL, setPosts);
  }, []);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

// Set default handlers for all stories
export default {
  msw: [
    msw.http.get(FETCH_URL, () => {
      return msw.HttpResponse.json([{ id: 1, title: "msw post default" }]);
    }),
  ],
};

// Replace handlers
Replaced.msw = [
  msw.http.get(FETCH_URL, () => {
    return msw.HttpResponse.json([{ id: 1, title: "msw post replaced" }]);
  }),
];

// Reset handlers
Live.msw = [];
