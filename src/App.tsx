import { useState } from "react";
import Portada from "./Portada";
import Introduccion from "./Introduccion.jsx";
import Variables from "./Variables";
import EjerciciosTipos from "./EjerciciosTipos";
import EjerciciosLogica from "./EjerciciosLogica";

export default function App() {
  const [pantalla, setPantalla] = useState("portada");
  const [oscuro, setOscuro] = useState(false);

  function mostrarPantalla() {
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

    if (pantalla === "variables")
      return (
        <Variables
          onBack={() => setPantalla("introduccion")}
          onNext={() => setPantalla("ejercicios")}
        />
      );

    if (pantalla === "ejercicios")
      return (
        <EjerciciosTipos
          onBack={() => setPantalla("variables")}
          onNext={() => setPantalla("logica")}
        />
      );

    if (pantalla === "logica")
      return (
        <EjerciciosLogica
          onBack={() => setPantalla("ejercicios")}
          onNext={() => setPantalla("cierre")}
        />
      );

  return <h1>Aquí irá el siguiente apartado</h1>;
  }

  return (
    <div className={oscuro ? "tema oscuro" : "tema"}>
      {mostrarPantalla()}
      <label className="interruptor">
        <input type="checkbox" checked={oscuro} onChange={() => setOscuro(!oscuro)} />
        <span className="pista"></span>
        Modo oscuro
      </label>
    </div>
  );
}
