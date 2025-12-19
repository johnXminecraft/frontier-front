
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LogoFrontier from '../assets/frontier-logo.svg?react';
import LogoTelegramLink from "../assets/telegram-logo-link.svg?react";

export default function Footer() {
    return (
        <Container className="footer-wrapper">
            <Container className="footer d-flex w-100">
                <Container className="logo-text-container-footer">
                    <Container className="logo-container-footer">
                        <LogoFrontier className="logo-footer" />
                    </Container>
                    <Container className="text-container-footer">
                        <Container className="title-footer">
                            <h5>Фронтир</h5>
                        </Container>
                        <Container className="text-footer">
                            <Container className="text-footer-row">
                                <p>Культурно-просвітницька платформа</p>
                            </Container>
                            <Container className="text-footer-row">
                                <p>мілітарного спрямування</p>
                            </Container>
                            <Container className="text-footer-row">
                                <p>&copy; 2025 Фронтир</p>
                            </Container>
                        </Container>
                    </Container>
                </Container>
                <Container className="link-container-footer">
                    <Link to={"https://t.me/front_tier"} className="link-to-tg">
                        <Container className="link-footer">
                            <LogoTelegramLink className="logo-tg-link" />
                        </Container>
                    </Link>
                </Container>
            </Container>
        </Container>
    );
}
