
import { useState, useEffect } from "react";
import { getPosts, } from "../api/posts.tsx"
import type { ResponseFrontier } from "../api/posts.tsx"

export default function PostList() {

    const [data, setData] = useState<ResponseFrontier | null>(null);

    useEffect(() => {
        getPosts()
        .then(setData)
        .catch(err => console.error("API ERROR:", err));
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
    <ul>
      {data.items.map(post => (
        <li key={post.id}>
          <h1>{post.title}</h1>
          <h2>{post.createdAtUtc}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
