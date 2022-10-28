import { useContext } from "react";
import ArticuloContext from "./components/context/ArticuloContext";
import Title from "./components/Title/Title";
import SearchInput from "./components/SearchInput/SearchInput";
import Form from "./components/Form/Form";
import CardAriculo from "./components/CardArticulo/CardAriculo";
import Spinner from "./components/Spinner/Spinner";
import imgSearch from "./assets/search.gif";
import "./App.scss";
import "animate.css";
function App() {
  const { isVisibleArticulo, form, searcInputVisible, isLoad } =
    useContext(ArticuloContext);
  return (
    <main className="wrapper">
      <div className="rectangulo" />
      <Title title="CRUD COPPEL" />
      {searcInputVisible && <SearchInput />}
      {isLoad && <Spinner />}
      {form.visible ? (
        <Form />
      ) : (
        !isVisibleArticulo && (
          <div className="noFound animate__fadeIn">
            <p>Aún no se ha buscado ningun artículo</p>
            <img src={imgSearch} alt="search" className="media" />
          </div>
        )
      )}
      {isVisibleArticulo && <CardAriculo />}
    </main>
  );
}

export default App;
