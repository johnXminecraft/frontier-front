
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

    function formatDate(dateString: string) {
        const d = new Date(dateString);
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    if (!data) return <p>Loading...</p>;

    return (
    <>
      {data.items.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <h2>{formatDate(post.createdAtUtc)}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}
