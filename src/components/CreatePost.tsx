
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { addPost } from "../api/posts.tsx"
import { useNavigate } from "react-router-dom";
import { slugify } from "transliteration";

export default function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    // const [author, setAuthor] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newPost = await addPost(title, slug, content, true);
            console.log("Post created:", newPost);
            navigate(`/${newPost.id}`);
        } catch (err: any) {
            console.error(err);
        }
    };

    const getSlug = (postTitle: string) => {
        return slugify(postTitle);
    }

    return (
        <Container className="create-post-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                        setSlug(getSlug(title));
                    }}
                    />
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={20}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="# Heading\n\nWiki-style content here..."
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Label>Preview</Form.Label>
                        <Container className="create-post-markdown-container">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </Container>
                    </Col>
                </Row>
                <Button type="submit" className="frontier-button">
                    Create Post
                </Button>
            </Form>
        </Container>
    )
}
