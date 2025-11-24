import "../styles/global.css";
import "../styles/components/molecules/LoginForm.css";
import LoginForm from "../components/molecules/LoginForm";

export default function Ingresar() {
  return (
    <div className="login-page-body login-page-background">
      <LoginForm />
    </div>
  );
}
