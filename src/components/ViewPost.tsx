
import { useParams, useNavigate } from "react-router-dom";
import type PostProps from "../interfaces/Post.tsx"
import { useState, useEffect } from "react";
import { getPostById } from "../api/posts.tsx";
import { Container, Image, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function ViewPost() {

    const API_BASE = "http://localhost:5160/images/posts/";
    const DEFAULT_IMAGE = `${API_BASE}placeholder.png`;
    const DEFAULT_IMAGE_LOCAL = "/src/assets/pics/placeholder.png";

    const navigate = useNavigate();
    const access_token = localStorage.getItem("access_token");
    const [authenticated, setAuthenticated] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostProps | null>(null);

    useEffect(() => {
        if (!id) return;

        getPostById(Number(id))
            .then(setPost)
            .catch(console.error);
        if(!access_token) 
            setAuthenticated(false);
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
                    <Image 
                        fluid 
                        src={post?.image && post.image !== "placeholder.png" ? `${API_BASE}${post.image}` : DEFAULT_IMAGE} 
                        alt={post?.title || "Post Image"} 
                        onError={(e) => {
                            // Fallback if the image URL is broken (404)
                            (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                        }}
                    />
                </Container>
                <Container className="view-post-content-container">
                    <Container className="view-post-content-side-container side-left">
                        <p className="clamp-side">
                            <ReactMarkdown>{post?.notes}</ReactMarkdown>
                        </p>
                    </Container>
                    <Container className="view-post-content-content-container">
                        <Container className="view-post-title-edit-container">
                            <Container className="view-post-title-container">
                                <h1>{post?.title}</h1>
                            </Container>
                            {authenticated && 
                                <Button
                                    className="frontier-button m-0"
                                    onClick={() => navigate(`/${id}/edit`)}
                                >
                                    Редагувати
                                </Button>
                            }
                        </Container>
                        <Container className="view-post-date-container">
                            <h5>{formatDate(post?.createdAtUtc)}</h5>
                        </Container>
                        <Container className="view-post-date-container">
                            <h5>Автор: {post?.author}</h5>
                        </Container>
                        <ReactMarkdown>{post?.content}</ReactMarkdown>
                    </Container>
                    <Container className="view-post-content-side-container side-right">
                        <p className="clamp-side">
                            <ReactMarkdown>{post?.notes}</ReactMarkdown>
                        </p>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
