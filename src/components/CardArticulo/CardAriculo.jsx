import { useContext } from "react";
import ArticuloContext from "../context/ArticuloContext";
import { CalendarBajaIcon, CalendarIcon, StackIcon } from "../Icons";
import Logo from "./../../assets/logo.webp";
import "animate.css";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";
const CardAriculo = () => {
  const { articulo, buttonActionUpdate, buttonActionDelete, sku } =
    useContext(ArticuloContext);
  // const handleSetDate = (date) => {
  //   return format(new Date(date), "MMM-d-yyyy", {
  //     locale: es,
  //   });
  // };
  return (
    <div className="articleCard animate__animated animate__backInLeft">
      <div className="lineArticulo" />
      <img src={Logo} className="logo" alt="logo" />
      <div className="wrapperData">
        <p className="type">
          Articulo: <span>{articulo.articulo}</span>
        </p>
        <p className="sku">
          Sku: <span>{sku}</span>
        </p>
      </div>
      <p className="type">
        Marca: <span>{articulo.marca}</span>
      </p>
      <p className="type">
        Modelo: <span>{articulo.modelo}</span>
      </p>
      <p className="type">
        Departamento: <span>{articulo.departamento.value}</span>
      </p>
      <p className="type">
        Clase: <span>{articulo.clase.value}</span>
      </p>
      <p className="type">
        Familia: <span>{articulo.familia.value}</span>
      </p>
      <p className="type">
        Fecha de alta: <span>{articulo.fecha_de_alta}</span>
        <CalendarIcon />
      </p>
      <div className="wrapperStocks">
        <p className="type">
          Stock: <span>{articulo.stock}</span>
          <StackIcon />
        </p>
        <p className="type">
          Cantidad: <span>{articulo.cantidad}</span>
          <StackIcon />
        </p>
      </div>
      {articulo.descontinuado && (
        <p className="type">
          Fecha de baja: <span>{articulo.fecha_de_baja}</span>
          <CalendarBajaIcon />
        </p>
      )}
      <p className="type">
        Descontinuado:{" "}
        <span
          className={
            articulo.descontinuado ? "descontinuado" : "no-descontinuado"
          }
        >
          {articulo.descontinuado ? "Desconituado" : "No descontinuado"}
        </span>
      </p>
      <div className="wrapperButtons">
        <button className="button editar" onClick={buttonActionUpdate}>
          Editar
        </button>
        <button
          className="button delete"
          onClick={() => buttonActionDelete(sku)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardAriculo;
