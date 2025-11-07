import { Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import '../styles/pages/RestablecerContraseña.css';

const RestablecerContraseña = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = document.getElementById('emailInput').value;
    
    if (!emailValue.includes("@duoc.cl") && 
        !emailValue.includes("@profesor.duoc.cl") && 
        !emailValue.includes("@gmail.com")) {
      alert("El email debe ser de dominio @duoc.cl, @profesor.duoc.cl o @gmail.com");
      document.getElementById('emailInput').focus();
      return;
    }
    
    alert('El correo ha sido enviado');
    e.target.reset();
  };

  return (
    <main className="body-reset">
      <div className="wrapper">
        <form id="resetForm" onSubmit={handleSubmit}>
          <h1>Restablecer contraseña</h1>
          <p className="instruction">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
          
          <Input
            id="emailInput"
            type="email"
            placeholder="Correo electrónico"
            required
            icon="bx bxs-envelope"
          />
          
          <Button type="submit" className="btnR">Enviar enlace</Button>
          
          <div className="back-link">
            <p><Link to="/ingresar">← Volver al inicio de sesión</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RestablecerContraseña;