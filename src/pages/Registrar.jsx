import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import '../styles/pages/Registrar.css';

const Registrar = () => {
  const navigate = useNavigate();

  const validarNombre = (nombre) => {
    if (nombre.length < 3 || nombre.length > 30) {
      alert("El nombre debe tener al menos 3 caracteres y máximo 30");
      return false;
    }
    return true;
  };

  const validarEmail = (email) => {
    if (!email.includes("@duoc.cl") && !email.includes("@profesor.duoc.cl") && !email.includes("@gmail.com")) {
      alert("El email debe contener @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return false;
    }
    return true;
  };

  const validarContrasenia = (contrasenia, confirmarContrasenia) => {
    if (contrasenia.length < 4 || contrasenia.length > 10) {
      alert("La contraseña debe tener al menos 4 caracteres y máximo 10");
      return false;
    }
    if (contrasenia !== confirmarContrasenia) {
      alert("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const confirmarEmailUsuario = (email) => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
      const usuariosArray = usuariosGuardados.split(",");
      for (let i = 0; i < usuariosArray.length; i++) {
        const usuarioData = usuariosArray[i].split("|");
        if (usuarioData[1] === email) {
          alert("El correo de usuario ya existe, prueba con otro");
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const tipoUsuario = formData.get('tipoUsuario');
    const contrasenia = formData.get('contrasenia');
    const confirmarContrasenia = formData.get('confirmarContrasenia');

    if (validarNombre(nombre) && validarEmail(email) && confirmarEmailUsuario(email) && validarContrasenia(contrasenia, confirmarContrasenia)) {
      const usuariosGuardados = localStorage.getItem("usuarios") || "";
      const nuevoUsuario = `${nombre}|${email}|${tipoUsuario}|${contrasenia}`;
      const nuevosUsuarios = usuariosGuardados ? `${usuariosGuardados},${nuevoUsuario}` : nuevoUsuario;
      
      localStorage.setItem("usuarios", nuevosUsuarios);
      alert("Usuario registrado exitosamente");
      navigate("/ingresar");
    }
  };

  return (
    <main className="body-register">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Crear cuenta</h1>
          
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            required
            icon="bx bxs-user"
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            icon="bx bxs-envelope"
          />

          <select className="casilla" name="tipoUsuario">
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          
          <Input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            required
            icon="bx bxs-lock-alt"
          />
          
          <Input
            type="password"
            name="confirmarContrasenia"
            placeholder="Confirmar contraseña"
            required
            icon="bx bxs-lock-alt"
          />
          
          <div className="terms">
            <label><input type="checkbox" required />Acepto los términos y condiciones</label>
          </div>
          
          <Button type="submit" className="btnR">Registrarse</Button>
          
          <div className="login-link">
            <p>¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesión aquí.</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Registrar;