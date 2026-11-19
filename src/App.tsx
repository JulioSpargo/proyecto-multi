import { useState } from "react";
import Portada from "./Portada";
import Introduccion from "./Introduccion.jsx";

export default function App() {
  const [pantalla, setPantalla] = useState("portada");

  if (pantalla === "portada")
    return <Portada onStart={() => setPantalla("introduccion")} />;

  if (pantalla === "introduccion")
    return (
      <Introduccion
        videoUrl="https://www.youtube.com/embed/ID_DEL_VIDEO"
        onBack={() => setPantalla("portada")}
        onNext={() => setPantalla("variables")}
      />
    );

  return <h1>Aquí irá el siguiente apartado</h1>;
}