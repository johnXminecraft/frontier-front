
import { useState, useEffect } from "react";
import { getPosts, } from "../api/posts.tsx"
import type { ResponseFrontier } from "../api/posts.tsx"
import PostShort from "./PostShort.tsx"
import { Container, Button } from "react-bootstrap"

export default function PostList() {

    const [data, setData] = useState<ResponseFrontier | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
      getPosts(page, pageSize)
        .then(setData)
        .catch(err => console.error("POSTS ERROR:", err));
    }, [page]);

    if (!data) return <p>Loading...</p>;

    const totalPages = Math.ceil(data.total / data.pageSize);

    return (
    <>
      {data.items.map(post => (
        <PostShort 
          key={post.id}
          id={post.id}
          title={post.title} 
          slug={post.slug}
          content={post.content}
          published={post.published}
          createdAtUtc={post.createdAtUtc}
          updatedAtUtc={post.updatedAtUtc}
        />
      ))}

      <Container className="page-selector-wrapper">
        <Container className="page-selector-container">
          <Button className="page-selector-button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            Попередня
          </Button>
          <h2>Сторінка {page}</h2>
          <Button className="page-selector-button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Наступна
          </Button>
        </Container>
      </Container>
    </>
  );
}
