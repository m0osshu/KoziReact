import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/molecules/LoginForm';
import '../styles/pages/Ingresar.css';

const Ingresar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    verificarSesionActiva();
  }, []);

  const verificarSesionActiva = () => {
    const nombre = localStorage.getItem("usuarioActivoNombre");
    if (nombre) {
      navigate("/");
    }
  };

  const handleLogin = (formData) => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
      const usuariosArray = usuariosGuardados.split(",");
      
      for (let i = 0; i < usuariosArray.length; i++) {
        const usuarioData = usuariosArray[i].split("|");
        if (usuarioData.length === 4) {
          if (usuarioData[1] === formData.email && usuarioData[3] === formData.contrasenia) {
            alert("Inicio de sesión exitoso");
            alert(`Bienvenido: ${usuarioData[0]} (${usuarioData[2]})`);

            localStorage.setItem("usuarioActivoNombre", usuarioData[0]);
            localStorage.setItem("usuarioActivoEmail", usuarioData[1]);
            localStorage.setItem("usuarioActivoTipo", usuarioData[2]);

            navigate("/");
            return;
          }
        }
      }
    }
    alert("Correo electrónico o contraseña incorrectos");
  };

  return (
    <div className="body-login">
      <div className="wrapper">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Ingresar;