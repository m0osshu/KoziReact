// src/pages/RestablecerContraseña.jsx
import "../styles/global.css";
import "../styles/pages/RestablecerContraseña.css"; // NOTA: clase "reset-page" creada por ia
import ResetPasswordForm from "../components/molecules/ResetPasswordForm";

export default function RestablecerContraseña() {
  return (
    <div className="reset-page">
      <ResetPasswordForm />
    </div>
  );
}
