import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AlertError from "../AlertError/AlertError";
import ArticuloContext from "./../context/ArticuloContext";
import "animate.css";
const SearchInput = () => {
  const { handleGetArticulo } = useContext(ArticuloContext);
  const formik = useFormik({
    initialValues: {
      sku: "",
    },
    validationSchema: Yup.object({
      sku: Yup.string()
        .max(6, "el sku máximo puede ser de 6 dígitos")
        .required("es necesario un sku para buscar un artículo"),
    }),
    onSubmit: (data) => {
      handleGetArticulo(data);
      // Reset to `initialValues`
      formik.resetForm();
    },
  });
  return (
    <form
      className="searchForm animate__animated animate__zoomIn"
      onSubmit={formik.handleSubmit}
    >
      <div className="wrapperInput">
        <label htmlFor="sku" className="label">
          Ingresa un sku para buscar un artículo
        </label>
        <input
          id="sku"
          name="sku"
          type="text"
          className="input"
          placeholder="sku: 198588"
          value={formik.values.sku}
          onChange={formik.handleChange}
        />
      </div>
      {formik.touched.sku && formik.errors.sku && (
        <AlertError textError={formik.errors.sku} />
      )}
      <button type="submit" className="searchFormbutton">
        Buscar
      </button>
    </form>
  );
};

export default SearchInput;
