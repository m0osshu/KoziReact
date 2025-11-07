import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import Ingresar from './pages/Ingresar';
import Registrar from './pages/Registrar';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import RestablecerContraseña from './pages/RestablecerContraseña';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/restablecer-contraseña" element={<RestablecerContraseña />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;