
import { useState, useRef } from "react";
import { Form, Button, Row, Col, Container, Image, Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import "highlight.js/styles/github.css";
import type { DragEvent } from "react";
import { addPost } from "../api/posts.tsx";
import { useNavigate } from "react-router-dom";
import { slugify } from "transliteration";

export default function CreatePost() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const access_token = localStorage.getItem("access_token");

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("placeholder.png"); // The URL string for the DB
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5160/uploads", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${access_token})}`
                }
            });

            if (!response.ok) {
                // This will tell you if it's a 401, 404, or 500
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            setImage(data.url);
        } catch (err) {
            console.error("Full Upload Error Details:", err);
        } finally {
            setUploading(false);
        }
    };

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPost = await addPost(title, getSlug(title), content, notes, author, image, true);
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
            <Container className="create-post-title-container">
                <h1>Нова стаття</h1>
            </Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 create-form">
                    <Form.Label>Головне зображення</Form.Label>
                    <Container 
                        className={`image-dropzone ${isDragging ? "dragging" : ""} ${image !== "placeholder.png" ? "has-image" : ""}`}
                        onDragOver={onDragOver}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            hidden 
                            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                        />
                        
                        {uploading ? (
                            <Spinner animation="border" variant="primary" />
                        ) : image !== "placeholder.png" ? (
                            <Image src={`http://localhost:5160/images/posts/${image}`} fluid className="upload-preview" />
                        ) : (
                            <Container className="dropzone-text">
                                <p>Перетягніть фото сюди або натисніть, щоб обрати</p>
                            </Container>
                        )}
                    </Container>
                </Form.Group>
                <Form.Group className="mb-3 create-form">
                    <Form.Label>Назва</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                            setSlug(getSlug(title));
                        }}
                    />
                </Form.Group>
                <Row className="mb-3 create-form">
                    <Col md={6} className="create-form">
                        <Form.Group>
                            <Form.Label>Стаття</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={20}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Стаття"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6} className="create-form">
                        <Form.Label>Прев'ю</Form.Label>
                        <Container className="create-post-markdown-container">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkRehype]}
                                rehypePlugins={[rehypeHighlight, remarkRehype]}
                            >
                                {content}
                            </ReactMarkdown>
                        </Container>
                    </Col>
                </Row>
                <Form.Group className="mb-3 create-form">
                    <Form.Label>Нотатки</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Нотатки"
                    />
                </Form.Group>
                <Form.Group className="mb-3 create-form">
                    <Form.Label>Автор</Form.Label>
                    <Form.Control
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                </Form.Group>
                <Container className="create-button-container">
                    <Button type="submit" className="frontier-button create-button">
                        Створити
                    </Button>
                </Container>
            </Form>
        </Container>
    )
}
