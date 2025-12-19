
import { Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

interface PostShortProps {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PostShort({
        id, 
        title, 
        slug, 
        content, 
        published, 
        createdAt, 
        updatedAt
} : PostShortProps) {

    function formatDate(date: string) {
        const d = new Date(date);
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    /* perhaps I need it
    function truncate(text: string, maxLength: number) {
        if(text.length > maxLength) {
            return text.slice(0, maxLength) + "..."
        }
        return text;
    }
    */

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
                            <p className="post-short-text-date">{formatDate(createdAt)}</p>
                        </Container>
                    </Container>
                </Container>
            </Link>
        </>
    )
}
