import { useContext } from "react";
import ArticuloContext from "../context/ArticuloContext";

const PreviewArticulo = ({ articulo }) => {
  const { handleGetArticulo } = useContext(ArticuloContext);
  return (
    <div className="previewArticulo">
      <p className="sku">
        Sku: <span>{articulo.sku}</span>
      </p>
      <p>
        Nombre Articulo: <span>{articulo.articulo}</span>
      </p>
      <p>
        Marca: <span>{articulo.marca}</span>
      </p>
      <p>
        Modelo: <span>{articulo.modelo}</span>
      </p>
      <div className="wrapperStock">
        <p>
          Stock:<span>{articulo.stock}</span>
        </p>
        <p>
          Cantidad: <span>{articulo.cantidad}</span>
        </p>
      </div>
      <button
        className="actionButton"
        onClick={() => handleGetArticulo({ sku: articulo.sku })}
      >
        Ver más
      </button>
    </div>
  );
};

export default PreviewArticulo;
