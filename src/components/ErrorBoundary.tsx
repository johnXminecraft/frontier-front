
import { Component, type ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import "../css/App.css";
import LogoFrontier from '../assets/frontier-logo.svg?react';
import SearchBar from './SearchBar.tsx';
import Footer from "./Footer.tsx";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("React render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="main-container p-0 m-0 min-vh-100 h-auto w-100">
            <Container className="header">
                <Container className="logo-container">
                    <LogoFrontier className="logo" />
                </Container>
                <Container fluid className="search-bar-container">
                    <SearchBar />
                </Container>
            </Container> 
            <Container className="content">
                <h1>Something went wrong...</h1>
            </Container>
            <Footer />
        </Container>
      );
    }

    return this.props.children;
  }
}
