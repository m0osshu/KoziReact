import "../styles/global.css";
import "../styles/pages/RestablecerContraseña.css"; 
import ResetPasswordForm from "../components/molecules/ResetPasswordForm";

export default function RestablecerContraseña() {
  return (
    <div className="reset-page">
      <ResetPasswordForm />
    </div>
  );
}
