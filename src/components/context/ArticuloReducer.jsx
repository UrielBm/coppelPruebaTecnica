import {
  DO_CANCEL,
  DO_REGISTER,
  SEARCH_ARTICULO,
  SET_ALLDATA,
  SHOW_FORMREGISTER,
  SHOW_FORMUPDATE,
  UPDATE_ARTICULO,
} from "../type";

const ArticuloReducer = (state, action) => {
  switch (action.type) {
    case SET_ALLDATA:
      return {
        ...state,
        arrayArticulos: action.payload,
      };
    case SEARCH_ARTICULO:
    case DO_REGISTER:
      return {
        ...state,
        sku: action.payload.sku,
        articulo: action.payload,
        isVisibleArticulo: true,
        form: { visible: false, type: null },
      };
    case SHOW_FORMREGISTER:
      return {
        ...state,
        sku: action.payload,
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
        isVisibleArticulo: false,
        form: { visible: true, type: "register" },
      };
    case SHOW_FORMUPDATE:
      return {
        ...state,
        isVisibleArticulo: false,
        searcInputVisible: false,
        form: { visible: true, type: "update" },
      };
    case UPDATE_ARTICULO:
      return {
        ...state,
        searcInputVisible: true,
        form: { visible: false, type: null },
      };
    case DO_CANCEL:
      return {
        ...state,
        isVisibleArticulo: true,
        searcInputVisible: true,
        form: { visible: false, type: null },
      };
    default:
      return state;
  }
};
export default ArticuloReducer;
