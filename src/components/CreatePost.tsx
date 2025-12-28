
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { addPost } from "../api/posts.tsx"
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newPost = await addPost(title, slug, content, published);
            console.log("Post created:", newPost);
            navigate(`/${newPost.id}`);
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <Container className="create-post-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    />
                </Form.Group>

                <Row>
                    {/* Editor */}
                    <Col md={6}>
                    <Form.Group>
                        <Form.Label>Content (Markdown)</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={20}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="# Heading\n\nWiki-style content here..."
                        />
                    </Form.Group>
                    </Col>

                    {/* Preview */}
                    <Col md={6}>
                    <Form.Label>Preview</Form.Label>
                    <div className="border p-3 bg-light" style={{ minHeight: "450px" }}>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                    </Col>
                </Row>

                <Form.Check
                    className="mt-3"
                    label="Published"
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                />

                <Button type="submit" className="mt-3">
                    Create Post
                </Button>
            </Form>
        </Container>
    )
}
