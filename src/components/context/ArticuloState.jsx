import { useReducer, useState } from "react";
import useAlert from "../../hooks/useAlert";
import ArticuloReducer from "./ArticuloReducer";
import ArticuloContext from "./ArticuloContext";
import Swal from "sweetalert2";
import BaseAxios from "../utils/BaseAxios";
import {
  SEARCH_ARTICULO,
  SHOW_FORMREGISTER,
  SHOW_FORMUPDATE,
  UPDATE_ARTICULO,
  DO_CANCEL,
  SET_ALLDATA,
} from "./../type";
const ArticuloState = (props) => {
  const initialState = {
    sku: null,
    articulo: {
      articulo: "",
      marca: "",
      modelo: "",
      departamento: "",
      clase: "",
      familia: "",
      fecha_de_alta: Date.now(),
      fecha_de_baja: Date.now(),
      stock: "",
      cantidad: "",
      descontinuado: false,
    },
    arrayArticulos: [],
    isVisibleArticulo: false,
    searcInputVisible: true,
    form: { visible: false, type: null },
  };
  const [state, dispatch] = useReducer(ArticuloReducer, initialState);
  const [isLoad, setIsLoad] = useState(false);
  const { rightAlert, errorAlert } = useAlert();

  // función para optener un articulo.
  const handleGetArticulo = async ({ sku }) => {
    try {
      setIsLoad(true);
      const response = await BaseAxios.get(`/findarticulo/${sku}/`);
      dispatch({
        type: SEARCH_ARTICULO,
        payload: response.data.articulo,
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({ type: SHOW_FORMREGISTER, payload: sku });
      } else {
        errorAlert();
      }
    } finally {
      setIsLoad(false);
    }
  };
  const handleDoRegister = async (articulo) => {
    try {
      const response = await BaseAxios.post(`/registrararticulo`, articulo);
      rightAlert(response.data.mensage);
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      errorAlert();
    }
  };
  const handleSetUpdate = async ({ sku, articulo }) => {
    try {
      const response = await BaseAxios.put(
        `/actualizaracticulo/${sku}`,
        articulo
      );
      dispatch({
        type: UPDATE_ARTICULO,
      });
      rightAlert(response.data.mensage);
    } catch (error) {
      console.log(error);
      errorAlert();
    }
  };
  //Buton action Cancel
  const buttonActionDoCancel = () => {
    dispatch({
      type: DO_CANCEL,
    });
  };

  //Button acion update
  const buttonActionUpdate = () => {
    dispatch({
      type: SHOW_FORMUPDATE,
    });
  };
  // Button action Delete
  const buttonActionDelete = async (sku) => {
    Swal.fire({
      icon: "warning",
      title: "¡Esta por eliminar un articulo!",
      text: `¿Seguro de eliminar el articulo con sku: ${sku}`,
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await BaseAxios.delete(`/eliminararticulo/${sku}`);
          rightAlert(response.data.mensage);
          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        } catch (error) {
          console.log(error);
          errorAlert();
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        return;
      }
    });
  };
  const handleGetAllArticulos = async () => {
    try {
      const response = await BaseAxios.get(`/findall`);
      dispatch({
        type: SET_ALLDATA,
        payload: response.data.articulos,
      });
    } catch (error) {}
  };
  return (
    <ArticuloContext.Provider
      value={{
        sku: state.sku,
        articulo: state.articulo,
        isVisibleArticulo: state.isVisibleArticulo,
        searcInputVisible: state.searcInputVisible,
        form: state.form,
        arrayArticulos: state.arrayArticulos,
        isLoad,
        handleGetArticulo,
        handleDoRegister,
        buttonActionUpdate,
        handleSetUpdate,
        buttonActionDelete,
        buttonActionDoCancel,
        handleGetAllArticulos,
      }}
    >
      {props.children}
    </ArticuloContext.Provider>
  );
};

export default ArticuloState;
