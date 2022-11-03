import { useState, useContext } from "react";
import ArticuloContext from "../context/ArticuloContext";
import AlertError from "../AlertError/AlertError";
import Title from "../Title/Title";
import clases from "./Clases.json";
import familias from "./Familias.json";
import { useFormik } from "formik";
import * as Yup from "yup";
const Form = () => {
  const {
    form,
    articulo,
    sku,
    handleSetUpdate,
    handleDoRegister,
    buttonActionDoCancel,
  } = useContext(ArticuloContext);
  const [stateClases, setStateClases] = useState([]);
  const [stateFamilia, setStateFamilia] = useState([]);
  const formik = useFormik({
    initialValues: {
      articulo: articulo.articulo,
      marca: articulo.marca,
      modelo: articulo.modelo,
      departamento: form.type === "update" ? articulo.departamento.id : "",
      clase: form.type === "update" ? articulo.clase.id : "",
      familia: form.type === "update" ? articulo.familia.id : "",
      stock: articulo.stock,
      cantidad: articulo.cantidad,
      descontinuado: articulo.descontinuado,
    },
    validationSchema: Yup.object({
      articulo: Yup.string()
        .max(15, "el articulo debe ser máximo de 15 carácteres.")
        .required("es necesario el nombre del artículo."),
      marca: Yup.string()
        .max(15, "la marca debe ser máximo de 15 carácteres.")
        .required("es necesaria la marca"),
      modelo: Yup.string()
        .max(20, "la marca debe ser máximo de 20 carácteres.")
        .required("es necesario el modelo"),
      departamento: Yup.string().required("es necesario algun departamento"),
      clase: Yup.string().required("es necesario alguna clase"),
      familia: Yup.string().required("es necesario alguna familia"),
      stock: Yup.number()
        .max(999999999, "no puede ser un valor mayor de 999999999")
        .min(1, "debe haber 1 en stock")
        .required("es necesario el stock"),
      cantidad: Yup.number()
        .max(Yup.ref("stock"), "cantidad no puede ser mayor questock")
        .required("es necesario una cantidad"),
    }),
    onSubmit: (data) => {
      form.type === "update"
        ? handleSetUpdate({ sku, articulo: data })
        : handleDoRegister({ sku, ...data });
      // Reset to `initialValues`
      formik.resetForm();
    },
  });
  const hanldeDepartamentoChange = (e) => {
    formik.handleChange(e);
    const arrayClases = clases.filter(
      ({ id_departamento }) => id_departamento === parseInt(e.target.value)
    );
    setStateClases(arrayClases);
  };
  const handleClaseChange = (e) => {
    formik.handleChange(e);
    const arrayFamilias = familias.filter(
      ({ id_clase }) => id_clase === parseInt(e.target.value)
    );
    setStateFamilia(arrayFamilias);
  };
  return (
    <form
      className="form animate__animated animate__fadeInRight"
      onSubmit={formik.handleSubmit}
    >
      <div className="line" />
      <Title
        title={
          form.type === "update"
            ? `Form de Actualización: ${articulo.articulo}.`
            : "Registro de nuevo Artículo."
        }
      />
      {form.type === "update" && (
        <div className="wrapperInput--checkbox">
          <input
            name="descontinuado"
            id="descontinuado"
            type="checkbox"
            className="checkbox"
            value={formik.values.descontinuado}
            onChange={formik.handleChange}
            checked={form.type === "update" && formik.values.descontinuado}
          />
          <label htmlFor="descontinuado">Descontinuado</label>
        </div>
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="articulo">
          Artículo:
        </label>
        <input
          name="articulo"
          id="articulo"
          type="text"
          className="input"
          placeholder="nombre del articulo"
          value={formik.values.articulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.articulo && formik.errors.articulo && (
        <AlertError textError={formik.errors.articulo} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="marca">
          Marca:
        </label>
        <input
          name="marca"
          id="marca"
          type="text"
          className="input"
          placeholder="marca del articulo"
          value={formik.values.marca}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.marca && formik.errors.marca && (
        <AlertError textError={formik.errors.marca} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="modelo">
          Modelo:
        </label>
        <input
          name="modelo"
          id="modelo"
          type="text"
          className="input"
          placeholder="modelo del articulo"
          value={formik.values.modelo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.modelo && formik.errors.modelo && (
        <AlertError textError={formik.errors.modelo} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="modelo">
          Departamento:
        </label>
        <select
          name="departamento"
          id="departamento"
          className="input"
          value={formik.values.departamento}
          onChange={hanldeDepartamentoChange}
          onBlur={formik.handleBlur}
        >
          <option value="">seleccione una</option>
          <option value={1}>Domestico</option>
          <option value={2}>Electronica</option>
          <option value={3}>Muebles sueltos</option>
          <option value={4}>Salas, Recamaras, Comedores</option>
        </select>
      </div>
      {formik.touched.departamento && formik.errors.departamento && (
        <AlertError textError={formik.errors.departamento} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="clase">
          Clase:
        </label>
        <select
          name="clase"
          id="clase"
          className="input"
          value={formik.values.clase}
          disabled={stateClases.length === 0 ? true : false}
          onChange={handleClaseChange}
          onBlur={formik.handleBlur}
        >
          <option value="">
            {form.type === "update" && stateClases.length === 0
              ? articulo.clase.value
              : "--selecciona una--"}
          </option>
          {stateClases.map(({ id, nombre }) => (
            <option key={id} value={id}>
              {nombre}
            </option>
          ))}
        </select>
      </div>
      {formik.touched.clase && formik.errors.clase && (
        <AlertError textError={formik.errors.clase} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="familia">
          Familia:
        </label>
        <select
          name="familia"
          id="familia"
          className="input"
          value={formik.values.familia}
          disabled={
            stateFamilia.length === 0 || formik.values.departamento === ""
              ? true
              : false
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">
            {form.type === "update" && stateFamilia.length === 0
              ? articulo.familia.value
              : "--selecciona una--"}
          </option>
          {stateFamilia.map(({ id, nombre }) => (
            <option key={id} value={id}>
              {nombre}
            </option>
          ))}
        </select>
      </div>
      {formik.touched.familia && formik.errors.familia && (
        <AlertError textError={formik.errors.familia} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="stock">
          Stock:
        </label>
        <input
          name="stock"
          id="stock"
          type="number"
          className="input"
          min="1"
          max="999999999"
          placeholder="número de stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.stock && formik.errors.stock && (
        <AlertError textError={formik.errors.stock} />
      )}
      <div className="wrapperInput">
        <label className="label" htmlFor="stock">
          Cantidad:
        </label>
        <input
          name="cantidad"
          id="cantidad"
          type="number"
          className="input"
          min="1"
          max="999999999"
          placeholder="número de cantidad"
          value={formik.values.cantidad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.cantidad && formik.errors.cantidad && (
        <AlertError textError={formik.errors.cantidad} />
      )}
      <div className="wrapperButton">
        <button className="button" type="submit">
          {form.type === "update" ? "Actualizar" : "Registrar"}
        </button>
        {form.type === "update" && (
          <button className="buttoncancelar" onClick={buttonActionDoCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
