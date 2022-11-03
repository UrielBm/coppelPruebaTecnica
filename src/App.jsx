import { useContext, useEffect } from "react";
import ArticuloContext from "./components/context/ArticuloContext";
import Title from "./components/Title/Title";
import SearchInput from "./components/SearchInput/SearchInput";
import Form from "./components/Form/Form";
import CardAriculo from "./components/CardArticulo/CardAriculo";
import Spinner from "./components/Spinner/Spinner";
import PreviewArticulo from "./components/PreviewArticulo/PreviewArticulo";
import "./App.scss";
import "animate.css";
function App() {
  const {
    isVisibleArticulo,
    handleGetAllArticulos,
    form,
    searcInputVisible,
    isLoad,
    arrayArticulos,
  } = useContext(ArticuloContext);
  useEffect(() => {
    handleGetAllArticulos();
  }, [handleGetAllArticulos]);

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
          <>
            <Title title="Todos los artículos" />
            <div className="wrapperPreview animate__fadeIn">
              {arrayArticulos.map((articulo) => (
                <PreviewArticulo key={articulo.sku} articulo={articulo} />
              ))}
            </div>
          </>
        )
      )}
      {isVisibleArticulo && <CardAriculo />}
    </main>
  );
}

export default App;
