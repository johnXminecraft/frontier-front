import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

export default function Dev() {
    return (
        <Container className="dev-wrapper">
            <Container className="dev-container">
                <Link to="/dev/new" className="logo-link">
                    <Button className="frontier-button">
                        Нова стаття
                    </Button>
                </Link>
            </Container>
        </Container>
    )
}