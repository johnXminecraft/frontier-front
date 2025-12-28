
import { useState } from "react";
import { Form, Button, Card, Alert, Spinner, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        await login(username, password);
        navigate("/");
    } catch (err) {
        console.error(err);
        setError("Invalid username or password");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container className="dev-login-wrapper">
        <Container className="dev-login-container">
            <Card style={{ width: "400px" }}>
                <Card.Body>
                    <Card.Title className="mb-4 text-center">
                        Login
                    </Card.Title>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? <Spinner /> : "Log In"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </Container>
  )
}
