
import { Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import type PostProps from "../interfaces/Post.tsx"
import ReactMarkdown from "react-markdown";

export default function PostShort({
        id, 
        title, 
        slug, 
        content, 
        notes,
        author,
        image,
        published, 
        createdAtUtc, 
        updatedAtUtc
} : PostProps) {

    const API_BASE = "http://localhost:5160/images/posts/";
    const DEFAULT_IMAGE = `${API_BASE}placeholder.png`;
    const DEFAULT_IMAGE_LOCAL = "/src/assets/pics/placeholder.png";

    function formatDate(date: string) {
        const d = new Date(date);
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    return (
        <>
            <Link to={`/${id}`} className="post-short-link-global">
                <Container className="post-short-container">
                    <Container className="post-short-image-container">
                        <Image 
                            fluid 
                            src={image && image !== "placeholder.png" ? `${API_BASE}${image}` : DEFAULT_IMAGE} 
                            alt={title || "Post Image"} 
                            onError={(e) => {
                                // Fallback if the image URL is broken (404)
                                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                            }}
                        />
                    </Container>
                    <Container className="post-short-text-container">
                        <Container className="post-short-text-title-container">
                            <h1 className="post-short-text-title">{title}</h1>
                        </Container>
                        <Container className="post-short-text-content-container">
                            <p className="post-short-text-content">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </p>
                        </Container>
                        <Container className="post-short-text-date-container">
                            <p className="post-short-text-date">Автор: {author}</p>
                        </Container>
                        <Container className="post-short-text-date-container">
                            <p className="post-short-text-date">{formatDate(createdAtUtc)}</p>
                        </Container>
                    </Container>
                </Container>
            </Link>
        </>
    )
}
