import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from "./pages/home";
import Ingresar from "./pages/ingresar";
import Blog from "./pages/blog";
import Nosotros from "./pages/nosotros";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/nosotros" element={<Nosotros />} />
          {/* Quita estas rutas por ahora */}
          {/* <Route path="/galeria" element={<Galeria />} /> */}
          {/* <Route path="/contacto" element={<Contacto />} /> */}
        </Routes>
      </main>
    </Router>
  )
}

export default App;