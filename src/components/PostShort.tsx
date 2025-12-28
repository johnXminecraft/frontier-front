
import { Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import type PostProps from "../interfaces/Post.tsx"

export default function PostShort({
        id, 
        title, 
        slug, 
        content, 
        published, 
        createdAtUtc, 
        updatedAtUtc
} : PostProps) {

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
                        <Image fluid src="/src/assets/pics/placeholder.png" alt="Picture" />
                    </Container>
                    <Container className="post-short-text-container">
                        <Container className="post-short-text-title-container">
                            <h1 className="post-short-text-title">{title}</h1>
                        </Container>
                        <Container className="post-short-text-content-container">
                            <p className="post-short-text-content">
                                {content}
                            </p>
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
