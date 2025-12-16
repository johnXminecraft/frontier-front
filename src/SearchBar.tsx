
import { useMemo, useState } from "react";
import { Container, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function SearchBar() {

    const [title, setTitle] = useState("")

    return (
        <Form className="full-width-form">
            <Form.Group className="search-group" controlId="title">
                <Container className="search-container">
                    {
                        title.length === 0 && <i className="bi bi-search search-icon" />
                    }
                    <Form.Control 
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        ></Form.Control>
                </Container>
            </Form.Group>
        </Form>
    )
}

export default SearchBar
