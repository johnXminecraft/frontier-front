import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import "./css/App.css"
import LogoFrontier from './assets/frontier-logo.svg?react';
import LogoX from './assets/x-logo.svg?react';
import SearchBar from './view/SearchBar.tsx'
import PostList from "./view/PostList.tsx";

function App() {

  const [isSpecial, setIsSpecial] = useState(false);

  useEffect(() => {
    // 20% chance
    const chance = Math.random() < 1/1488;
    setIsSpecial(chance);
  }, []);

  return (
    <Container className="main-container p-0 m-0 min-vh-100 h-auto w-100">
      <Container className="header">
        <Container className="logo-container">
          {
            isSpecial ? <LogoX className="logo" /> : <LogoFrontier className="logo" />
          }
        </Container>
        <Container fluid className="search-bar-container">
          <SearchBar />
        </Container>
      </Container> 
      <Container className="content">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/:id">
            <Route index element={<h1>View</h1>} />
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>
          <Route path="/dev" element={<h1>Dev</h1>} />
          <Route path="/dev/new" element={<h1>New</h1>} />
          <Route path="*" element={<h1>Fehler 404</h1>} />
        </Routes>
      </Container>
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
              <p>Культурно-просвітницька платформа</p>
              <p>мілітарного спрямування</p>
              <p>&copy; 2025 Фронтир</p>
            </Container>
          </Container>
        </Container>
        <Container className="link-container-footer">
            <Container className="link-footer">
              <a href="https://t.me/front_tier" className="link-footer-text">&copy;</a>
            </Container>
          </Container>
      </Container>
    </Container>
  )
}

export default App
