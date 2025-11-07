import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  return (
    <div className="producto-card">
      <img src={producto.url} alt={producto.nombre} className="producto-img" />
      <span className="producto-nombre">{producto.nombre}</span>
      <p className="producto-precio">${producto.precio}</p>
      <div className="producto-acciones">
        <Link to={`/producto?id=${producto.id}`} className="btn-comprar">
          Comprar
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;