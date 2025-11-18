// src/pages/Registrar.jsx
import "../styles/global.css";
import "../styles/components/molecules/LoginForm.css";
import RegisterForm from "../components/molecules/RegisterForm";

export default function Registrar() {
  return (
    <div className="login-page-body login-page-background">
      <RegisterForm />
    </div>
  );
}
