import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    contrasenia: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar sesion</h1>
      
      <Input
        type="text"
        placeholder="nombre de usuario"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
        icon="bx bxs-user"
      />
      
      <Input
        type="password" 
        placeholder="contraseña"
        value={formData.contrasenia}
        onChange={(e) => setFormData({...formData, contrasenia: e.target.value})}
        required
        icon="bx bxs-lock-alt"
      />

      <div className="remember-forgot">
        <label><input type="checkbox" />Recuerdame</label>
        <Link to="/restablecer-contraseña">olvidaste tu contraseña?</Link>
      </div>
      
      <Button type="submit" className="btnR">Ingresar</Button>
      
      <div className="register-link">
        <p>¿no tienes un cuenta? <Link to="/registrar">Registrate ahora.</Link></p>
      </div>
    </form>
  );
};

export default LoginForm;