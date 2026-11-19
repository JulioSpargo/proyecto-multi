import { useState } from "react";

/**
 * Introduccion — segundo apartado: qué es C++, cómo funciona y tu primer programa.
 * Uso:  <Introduccion videoUrl="https://www.youtube.com/embed/ID_DEL_VIDEO"
 *                     onBack={...} onNext={...} />
 */

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
  { titulo: "Código fuente", detalle: "Lo que tú escribes (.cpp)", icono: "📝" },
  { titulo: "Compilador", detalle: "Lo traduce a lenguaje máquina", icono: "⚙️" },
  { titulo: "Ejecutable", detalle: "Tu programa, listo para correr", icono: "🚀" },
];

const RAZONES = [
  { titulo: "Rápido", texto: "Se usa donde el rendimiento importa: videojuegos, sistemas y robots." },
  { titulo: "Base sólida", texto: "Aprenderlo te ayuda a entender Java, C# y otros lenguajes." },
  { titulo: "Muy usado", texto: "Está detrás de navegadores, motores gráficos y bases de datos." },
];

function Video({ url }) {
  if (!url) {
    return (
      <div className="video vacio">
        <span aria-hidden="true">▶</span>
        <p>
          Aquí va tu video. Pasa la dirección de inserción con la propiedad <code>videoUrl</code>.
        </p>
      </div>
    );
  }
  return (
    <div className="video">
      <iframe
        src={url}
        title="Video: ¿Qué es C++?"
        allow="accelerometer; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function Introduccion({ videoUrl = "", onBack = () => {}, onNext = () => {} }) {
  const [activa, setActiva] = useState(3);

  return (
    <main className="intro">
      <style>{css}</style>

      <header className="barra">
        <button type="button" className="volver" onClick={onBack}>
          ‹ Volver
        </button>
        <span className="ubicacion">Introducción</span>
      </header>

      <div className="contenido">
        <section>
          <h1>¿Qué es C++?</h1>
          <p className="lead">
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
          <ol className="flujo">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="paso">
                <span className="paso-icono" aria-hidden="true">{p.icono}</span>
                <strong>{p.titulo}</strong>
                <span>{p.detalle}</span>
                {i < PASOS.length - 1 && <span className="flecha" aria-hidden="true">›</span>}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>Tu primer programa</h2>
          <p>Toca cada línea para ver qué hace.</p>
          <div className="editor">
            <div className="lineas" role="list">
              {LINEAS.map((l, i) => (
                <button
                  key={i}
                  type="button"
                  role="listitem"
                  className={"linea" + (i === activa ? " activa" : "")}
                  onClick={() => setActiva(i)}
                  aria-pressed={i === activa}
                >
                  <span className="num">{i + 1}</span>
                  <code>{l.codigo}</code>
                </button>
              ))}
            </div>
            <p className="nota" aria-live="polite">
              <strong>Línea {activa + 1}:</strong> {LINEAS[activa].nota}
            </p>
          </div>
          <p className="salida-etiqueta">Al ejecutarlo verás:</p>
          <pre className="salida">¡Hola, mundo!</pre>
        </section>

        <footer className="pie">
          <button type="button" className="siguiente" onClick={onNext}>
            Continuar <span aria-hidden="true">›</span>
          </button>
        </footer>
      </div>
    </main>
  );
}

const css = `
.intro {
  --fondo-1: #0f0d24;
  --fondo-2: #2a1f5c;
  --panel: rgba(255, 255, 255, 0.06);
  --borde: rgba(255, 255, 255, 0.12);
  --texto: #ffffff;
  --texto-suave: #b9b4d6;
  --azul: #1d6dff;
  --azul-claro: #4da3ff;
  min-height: 100vh;
  padding: 0 20px 56px;
  font-family: Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
  color: var(--texto);
  background:
    radial-gradient(ellipse at 80% 0%, var(--fondo-2) 0%, transparent 55%),
    var(--fondo-1);
}
.intro *, .intro *::before, .intro *::after { box-sizing: border-box; }

.barra {
  max-width: 760px;
  margin: 0 auto;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ubicacion { color: var(--texto-suave); font-size: 0.95rem; }
.volver {
  font: inherit;
  font-size: 0.95rem;
  color: var(--texto-suave);
  background: var(--panel);
  border: 1px solid var(--borde);
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
}
.volver:hover { color: var(--texto); }

.contenido { max-width: 760px; margin: 0 auto; display: grid; gap: 44px; }

h1 { margin: 0 0 12px; font-size: clamp(2rem, 6vw, 2.8rem); font-weight: 800; letter-spacing: -0.02em; }
h2 { margin: 0 0 10px; font-size: 1.5rem; font-weight: 700; }
h3 { margin: 0 0 6px; font-size: 1.05rem; }
p { margin: 0 0 14px; line-height: 1.65; color: var(--texto-suave); max-width: 68ch; }
.lead { font-size: 1.1rem; color: #d9d5ee; }
code { font-family: "Fira Code", Consolas, Menlo, monospace; }

/* Video */
.video {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  border: 1px solid var(--borde);
}
.video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.video.vacio {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  text-align: center;
  padding: 24px;
  background: var(--panel);
  border-style: dashed;
}
.video.vacio span { font-size: 2.4rem; color: var(--azul-claro); }
.video.vacio p { margin: 0; font-size: 0.95rem; }

/* Razones */
.razones { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.razon { padding: 16px; background: var(--panel); border: 1px solid var(--borde); border-radius: 14px; }
.razon p { margin: 0; font-size: 0.95rem; }

/* Flujo de compilación */
.flujo { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 12px; grid-template-columns: repeat(3, 1fr); }
.paso {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 18px 10px;
  font-size: 0.9rem;
  color: var(--texto-suave);
  background: var(--panel);
  border: 1px solid var(--borde);
  border-radius: 14px;
}
.paso strong { color: var(--texto); font-size: 1rem; }
.paso-icono { font-size: 1.8rem; }
.flecha {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--azul-claro);
}

/* Editor interactivo */
.editor { border-radius: 14px; overflow: hidden; border: 1px solid var(--borde); background: #0a0818; }
.lineas { display: grid; padding: 10px 0; }
.linea {
  display: flex;
  gap: 16px;
  width: 100%;
  padding: 5px 16px;
  font: inherit;
  text-align: left;
  color: #d9d5ee;
  background: transparent;
  border: 0;
  border-left: 3px solid transparent;
  cursor: pointer;
  white-space: pre;
  overflow-x: auto;
}
.linea:hover { background: rgba(255, 255, 255, 0.05); }
.linea.activa { background: rgba(77, 163, 255, 0.16); border-left-color: var(--azul-claro); }
.num { color: #6d66a3; width: 1.2em; text-align: right; flex: none; }
.linea code { font-size: 0.95rem; }
.nota {
  margin: 0;
  padding: 14px 16px;
  color: #e6e2f7;
  background: rgba(255, 255, 255, 0.06);
  border-top: 1px solid var(--borde);
}
.salida-etiqueta { margin: 16px 0 6px; font-size: 0.9rem; }
.salida {
  margin: 0;
  padding: 14px 16px;
  font-family: "Fira Code", Consolas, Menlo, monospace;
  color: #8dffb0;
  background: #050410;
  border: 1px solid var(--borde);
  border-radius: 12px;
}

/* Navegación */
.pie { display: flex; justify-content: flex-end; }
.siguiente {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  font: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--azul-claro), var(--azul));
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 8px 26px rgba(29, 109, 255, 0.4);
  transition: transform 0.15s;
}
.siguiente:hover { transform: translateY(-2px); }

.intro button:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }

@media (max-width: 600px) {
  .flujo { grid-template-columns: 1fr; }
  .flecha { right: 50%; top: auto; bottom: -22px; transform: translateX(50%) rotate(90deg); }
}
@media (prefers-reduced-motion: reduce) { .siguiente { transition: none; } }
`;