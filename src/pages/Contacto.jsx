import '../styles/pages/Contacto.css';

const Contacto = () => {
  const validarFormulario = (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
      alert("Por favor, complete todos los campos.");
      return false;
    }

    if (nombre.length < 3 || nombre.length > 30) {
      alert("El nombre debe tener entre 3 y 30 caracteres.");
      return false;
    }

    if (!email.includes("@duoc.cl") && !email.includes("@profesor.duoc.cl") && !email.includes("@gmail.com")) {
      alert("El email debe ser de dominio @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return false;
    }

    alert("Formulario enviado con éxito.");
    
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensaje").value = "";
    
    return true;
  };

  return (
    <main>
      <section className="nosotrosContenedor">
        <h2 className="titulo">Nosotros</h2>
        <p className="nosotros-text">
          En Közi, nos especializamos en joyería de estilo gótico y VKei, ofreciendo anillos, collares y pulseras únicas que capturan la esencia de bandas legendarias como Malice Mizer. Nuestras piezas están diseñadas para expresar individualidad y conectarte con la estética visual kei, combinando materiales de calidad con diseños audaces y misteriosos. Cada creación refleja la elegancia oscura y la teatralidad que define este movimiento cultural japonés.
        </p>
        <div className="contenedor-img">
          <img src="/assets/img/logo.png" alt="Logo Közi" />
        </div>
      </section>

      <div className="contacto">
        <form onSubmit={validarFormulario}>
          <h2 className="contacto-text">contacto</h2>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
  
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje"></textarea>
  
          <button type="submit">Enviar</button>
        </form>
      </div>
    </main>
  );
};

export default Contacto;