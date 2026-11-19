import { useState } from "react";
const VIDEO_INTRO = "https://www.youtube.com/embed/CkUSy-REkUM";

const LINEAS = [
  {
    codigo: "#include <iostream>",
    nota: "Trae a tu programa las herramientas para mostrar y leer texto en pantalla.",
  },
  {
    codigo: "using namespace std;",
    nota: "Te permite escribir cout en lugar de std::cout.",
  },
  {
    codigo: "int main() {",
    nota: "Aquí empieza tu programa. Todo programa en C++ arranca en main.",
  },
  {
    codigo: '  cout << "¡Hola, mundo!" << endl;',
    nota: "Muestra el texto en pantalla. endl agrega un salto de línea.",
  },
  {
    codigo: "  return 0;",
    nota: "Le avisa al sistema que el programa terminó sin errores.",
  },
  {
    codigo: "}",
    nota: "Cierra la función main. Aquí termina el programa.",
  },
];

const PASOS = [
  { titulo: "Código fuente", detalle: "Lo que tú escribes (.cpp)" },
  { titulo: "Compilador", detalle: "Lo traduce a lenguaje máquina" },
  { titulo: "Ejecutable", detalle: "Tu programa, listo para correr" },
];

const RAZONES = [
  { titulo: "Rápido", texto: "Se usa donde el rendimiento importa: videojuegos, sistemas y robots." },
  { titulo: "Base sólida", texto: "Aprenderlo te ayuda a entender Java, C# y otros lenguajes." },
  { titulo: "Muy usado", texto: "Está detrás de navegadores, motores gráficos y bases de datos." },
];

function Video({ url }) {
  return (
    <div className="video">
      <iframe
        src={url || VIDEO_INTRO}
        title="Video: ¿Qué es C++?"
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function Introduccion({ videoUrl = VIDEO_INTRO, onBack, onNext }) {
  const [activa, setActiva] = useState(3);

  return (
    <main className="intro">
      <style>{css}</style>

      <header className="barra">
        <button className="volver" onClick={onBack}>
          Volver
        </button>
        <span>Introducción</span>
      </header>

      <div className="contenido">
        <section>
          <h1>¿Qué es C++?</h1>
          <p>
            C++ es un lenguaje de programación con el que le das instrucciones precisas a una
            computadora. Se creó en 1985 como una mejora del lenguaje C y hoy sigue siendo uno de los
            más usados del mundo.
          </p>
          <Video url={videoUrl} />
        </section>

        <section>
          <h2>¿Por qué aprenderlo?</h2>
          <div className="razones">
            {RAZONES.map((r) => (
              <div key={r.titulo} className="razon">
                <h3>{r.titulo}</h3>
                <p>{r.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>¿Cómo funciona un programa?</h2>
          <p>
            La computadora no entiende C++ directamente. Un compilador convierte tu código en un
            archivo que sí puede ejecutar.
          </p>
          <div className="pasos">
            {PASOS.map((p, i) => (
              <div key={p.titulo} className="paso">
                <strong>
                  {i + 1}. {p.titulo}
                </strong>
                <p>{p.detalle}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Tu primer programa</h2>
          <p>Haz clic en cada línea para ver qué hace.</p>
          <div className="editor">
            {LINEAS.map((l, i) => (
              <button
                key={i}
                className={i === activa ? "linea activa" : "linea"}
                onClick={() => setActiva(i)}
              >
                <span className="num">{i + 1}</span>
                <code>{l.codigo}</code>
              </button>
            ))}
          </div>
          <p className="nota">
            <strong>Línea {activa + 1}:</strong> {LINEAS[activa].nota}
          </p>
          <p>Al ejecutarlo verás:</p>
          <pre className="salida">¡Hola, mundo!</pre>
        </section>

        <div className="pie">
          <button className="siguiente" onClick={onNext}>
            Continuar
          </button>
        </div>
      </div>
    </main>
  );
}

const css = `
.barra {
  max-width: 750px;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--suave);
}

.contenido {
  max-width: 750px;
  margin: 0 auto;
  padding: 20px 30px;
  background: var(--tarjeta);
  border: 1px solid var(--borde);
  border-radius: 14px;
}

section { margin-bottom: 28px; }
h1 { margin: 0 0 10px 0; font-size: 28px; }
h2 { margin: 0 0 10px 0; font-size: 22px; color: var(--titulo); }
p { margin: 0 0 12px 0; line-height: 1.5; }
code, pre { font-family: Consolas, monospace; }
.progreso { color: var(--suave); }

.video { position: relative; padding-top: 56.25%; margin-bottom: 8px; background: black; border-radius: 12px; overflow: hidden; }
.video iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }

.video-vacio { padding: 40px; text-align: center; background: var(--tarjeta2); border: 1px dashed var(--borde); border-radius: 12px; }
h3 { margin: 0 0 5px 0; font-size: 17px; }
.razones, .pasos { display: flex; flex-wrap: wrap; gap: 10px; }
.razon, .paso { flex: 1; min-width: 180px; padding: 12px; background: var(--tarjeta2); border: 1px solid var(--borde); border-radius: 12px; }
.razon p, .paso p { margin: 5px 0 0 0; }

.editor { margin-bottom: 15px; padding: 10px 0; background: var(--codigo-fondo); border-radius: 12px; overflow: hidden; }
.linea { display: block; width: 100%; padding: 5px 15px; text-align: left; color: var(--codigo-texto); background: none; border: none; border-left: 3px solid transparent; cursor: pointer; white-space: pre; }
.linea:hover:enabled { background: rgba(255,255,255,0.1); }
.num { display: inline-block; width: 25px; color: #8a97c4; }

.linea.activa { background: var(--azul); border-left-color: white; }
.nota { padding: 10px 14px; margin-top: 10px; background: var(--aviso); border: 1px solid var(--borde); border-radius: var(--radio); }
.salida { margin: 0; padding: 10px 14px; color: var(--salida); background: var(--codigo-fondo); border-radius: var(--radio); }
.pie { text-align: right; }

.boton, .siguiente, .comenzar {
  padding: 10px 26px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: var(--azul);
  border: none;
  border-radius: var(--radio);
  cursor: pointer;
}
.boton:hover:enabled, .siguiente:hover, .comenzar:hover { background: var(--azul-hover); }
.boton:active:enabled, .siguiente:active, .comenzar:active { transform: translateY(1px); }
.boton:disabled { opacity: 0.5; cursor: not-allowed; }

.secundario, .volver, .audio {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--texto);
  background: var(--tarjeta);
  border: 1px solid var(--azul);
  border-radius: var(--radio);
  cursor: pointer;
}
.secundario { margin-right: 10px; font-size: 16px; padding: 10px 24px; }
.secundario:hover, .volver:hover, .audio:hover { background: var(--tarjeta2); }
`;
