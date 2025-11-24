import "../styles/global.css";
import "../styles/pages/Contacto.css"; 
import AboutSection from "../components/organisms/AboutSection";
import ContactForm from "../components/molecules/ContactForm";

export default function Contacto() {
  return (
    <div className="contact-page-body">
      <AboutSection />
      <ContactForm />
    </div>
  );
}
