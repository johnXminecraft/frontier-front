
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import type PostProps from "../interfaces/Post.tsx"
import ReactMarkdown from "react-markdown";
import { updatePost, deletePost, getPostById } from "../api/posts.tsx"
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "transliteration";

export default function EditPost() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostProps | null>(null);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (!id) return;
        getPostById(Number(id))
            .then(setPost)
            .catch(console.error);
        setTitle(post?.title ?? "");
        setSlug(post?.slug ?? "");
        setContent(post?.content ?? "");
        setNotes(post?.notes ?? "");
        setAuthor(post?.author ?? "");
        setImage(post?.image ?? "");
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        if (!id || !post) return;
        e.preventDefault();
        try {
            const updatedFields: any = {};
    
            if (title !== post?.title && title !== "")
                updatedFields.title = title;
                updatedFields.slug = getSlug(title);

            if (content !== post?.content && content !== "")
                updatedFields.content = content;
     
            if (notes !== post?.notes && notes !== "")
                updatedFields.notes = notes;
        
            if (author !== post?.author && author !== "")
                updatedFields.author = author;
        
            if (image !== post?.image && image !== "")
                updatedFields.image = image;
            // якщо нічого не змінено — не шлемо запит
            if (Object.keys(updatedFields).length === 0) {
              console.log("Немає змін");
              return;
            }
            const updatedPost = await updatePost(Number(id), updatedFields);
            console.log("Статтю оновлено:", updatedPost);
            navigate(`/${updatedPost.id}`);
        } catch (err: any) {
            console.error(err);
        }
    };

    const getSlug = (postTitle: string) => {
        return slugify(postTitle);
    }

    return (
        <Container className="create-post-wrapper">
            <Container className="edit-post-title-container">
                <h1>Редагувати статтю</h1>
                <Button className="frontier-button delete-post-button" onClick={
                    () => {
                        deletePost(Number(id));
                        navigate("/");
                    }
                }>
                    Видалити статтю
                </Button>
            </Container>
            <Form onSubmit={handleUpdate}>
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
                            <ReactMarkdown>{content}</ReactMarkdown>
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
                        Редагувати
                    </Button>
                </Container>
            </Form>
        </Container>
    )
}