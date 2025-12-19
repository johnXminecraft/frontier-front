
import { useParams } from "react-router-dom";
import type PostProps from "../interfaces/Post.tsx"
import { useState, useEffect } from "react";
import { getPostById } from "../api/posts.tsx";
import { Container, Image } from "react-bootstrap";

export default function ViewPost() {

    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostProps | null>(null);

    useEffect(() => {
    if (!id) return;

    getPostById(Number(id))
        .then(setPost)
        .catch(console.error);
    }, [id]);

    function formatDate(date?: string) {
        if(!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <Container className="view-post-wrapper">
            <Container className="view-post-container">
                <Container className="view-post-header">
                    <Container className="view-post-image-container">
                        <Image fluid src="/src/assets/pics/placeholder.png" alt="Picture" />
                    </Container>
                    <Container className="view-post-title-container">
                        <h1>{post?.title}</h1>
                    </Container>
                    <Container className="view-post-date-container">
                        <p>{formatDate(post?.createdAtUtc)}</p>
                    </Container>
                </Container>
                <Container className="view-post-content-container">
                    <p>{post?.content}</p>
                </Container>
            </Container>
        </Container>
    )
}
