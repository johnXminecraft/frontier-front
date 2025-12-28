
import { useState } from "react";
import { Form, Button, Card, Spinner, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        await login(username, password);
        navigate("/");
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <Container className="dev-login-wrapper">
        <Container className="dev-login-container">
            <Card className="login-card">
                <Card.Body>
                    <Card.Title className="login-title">
                        <h5>Увійти</h5>
                    </Card.Title>
                    <Form className="login-form-container" onSubmit={handleSubmit}>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="login-form"
                        />
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="login-form"
                        />
                        <Button type="submit" className="frontier-button login-button" disabled={loading}>
                            {loading ? <Spinner /> : "Вхід"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </Container>
  )
}
