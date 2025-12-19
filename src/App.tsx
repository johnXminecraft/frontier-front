import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"
import "./css/App.css";
import LogoFrontier from './assets/frontier-logo.svg?react';
import LogoX from './assets/x-logo.svg?react';
import SearchBar from './components/SearchBar.tsx';
import PostList from "./components/PostList.tsx";
import Footer from "./components/Footer.tsx"

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
      <Footer />
    </Container>
  )
}

export default App
