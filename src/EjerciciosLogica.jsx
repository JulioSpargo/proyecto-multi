import { useState } from "react";

const TEMAS = [
  {
    titulo: "Condicionales: if / else",
    resumen: "Mira el video y luego resuelve el ejercicio.",
    videoId: "HJgrvgQMm-o",
    codigo: `int n = 7;

if (n % 2 == 0) {
  cout << "par";
} else {
  cout << "impar";
}`,
    pregunta: "¿Qué imprime este programa?",
    opciones: ["par", "impar", "7", "No imprime nada"],
    correcta: "impar",
    explicacion:
      "7 % 2 da 1 (el residuo de dividir entre 2). Como no es 0, la condición es falsa y se ejecuta el else.",
  },
  {
    titulo: "Ciclos: while y do-while",
    resumen: "Mira el video y luego resuelve el ejercicio.",
    videoId: "zR751ldKh9Y",
    codigo: `int x = 10;

do {
  cout << x << " ";
  x++;
} while (x < 5);`,
    pregunta: "¿Cuántas veces se ejecuta el cuerpo del ciclo?",
    opciones: ["0 veces", "1 vez", "5 veces", "Infinitas veces"],
    correcta: "1 vez",
    explicacion:
      "El do-while ejecuta el cuerpo primero y revisa la condición después. Imprime 10, x pasa a 11, y como 11 < 5 es falso, termina. Con un while normal habría sido 0 veces.",
  },
  {
    titulo: "Ciclos: for",
    resumen: "Mira el video y luego resuelve el ejercicio.",
    videoId: "07IArB4KAvA",
    codigo: `for (int i = 1; i <= 9; i += 2) {
  cout << i << " ";
}`,
    pregunta: "¿Qué números imprime?",
    opciones: ["1 2 3 4 5 6 7 8 9", "1 3 5 7 9", "2 4 6 8", "1 3 5 7"],
    correcta: "1 3 5 7 9",
    explicacion:
      "i empieza en 1 y sube de 2 en 2 mientras i <= 9: 1, 3, 5, 7 y 9. Cuando i llega a 11 el ciclo termina.",
  },
];

export default function EjerciciosLogica({ onBack, onNext }) {
  const [paso, setPaso] = useState(0);
  const [elegidas, setElegidas] = useState([null, null, null]);

  const tema = TEMAS[paso];
  const elegida = paso < 3 ? elegidas[paso] : null;
  const puntos = TEMAS.filter((t, i) => elegidas[i] === t.correcta).length;

  const responder = (op) => {
    if (elegida !== null) return;
    const nuevas = [...elegidas];
    nuevas[paso] = op;
    setElegidas(nuevas);
  };

  const reiniciar = () => {
    setPaso(0);
    setElegidas([null, null, null]);
  };

  const claseOpcion = (op) => {
    if (elegida === null) return "opcion";
    if (op === tema.correcta) return "opcion correcta";
    if (op === elegida) return "opcion incorrecta";
    return "opcion";
  };

  return (
    <main className="ejl">
      <style>{css}</style>

      <header className="barra">
        <button className="volver" onClick={onBack}>Volver</button>
        <span>Ejercicios: lógica</span>
      </header>

      <div className="contenido">
        {paso < 3 && (
          <>
            <p className="progreso">Tema {paso + 1} de 3</p>

            <section>
              <h1>{tema.titulo}</h1>
              <p>{tema.resumen}</p>
              <div className="video">
                <iframe
                  key={tema.videoId}
                  src={`https://www.youtube.com/embed/${tema.videoId}`}
                  title={`Video: ${tema.titulo}`}
                  allowFullScreen
                />
              </div>
              <p>
                <a href={`https://youtu.be/${tema.videoId}`} target="_blank" rel="noreferrer">
                  Abrir en YouTube
                </a>
              </p>
            </section>

            <section>
              <h2>Ejercicio</h2>
              <pre className="codigo">{tema.codigo}</pre>
              <p>{tema.pregunta}</p>
              <div className="opciones">
                {tema.opciones.map((op) => (
                  <button
                    key={op}
                    className={claseOpcion(op)}
                    onClick={() => responder(op)}
                    disabled={elegida !== null}
                  >
                    {op}
                  </button>
                ))}
              </div>
              {elegida !== null && (
                <p className={elegida === tema.correcta ? "retro retro-ok" : "retro retro-mal"}>
                  <strong>{elegida === tema.correcta ? "¡Correcto!" : "Casi."}</strong>{" "}
                  {tema.explicacion}
                </p>
              )}
            </section>

            {elegida !== null && (
              <div className="pie">
                <button className="boton" onClick={() => setPaso(paso + 1)}>
                  {paso === 2 ? "Ver resultado" : "Siguiente"}
                </button>
              </div>
            )}
          </>
        )}

        {paso === 3 && (
          <section className="resultado">
            <h1>¡Muy bien!</h1>
            <p className="puntaje">Tu puntaje: {puntos} de 3</p>
            <p>
              {puntos === 3
                ? "Ya sabes leer condicionales y ciclos."
                : "Repasa los videos de los ejercicios que fallaste e inténtalo de nuevo."}
            </p>
            <button className="secundario" onClick={reiniciar}>Intentar de nuevo</button>
            <button className="boton" onClick={onNext}>Continuar</button>
          </section>
        )}
      </div>
    </main>
  );
}

const css = `
.barra {
  max-width: 700px;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--suave);
}

.contenido {
  max-width: 700px;
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

.opciones { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; }
.opcion {
  min-width: 120px;
  padding: 10px;
  font-family: Consolas, monospace;
  font-size: 15px;
  color: var(--texto);
  background: var(--tarjeta2);
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  cursor: pointer;
}
.opcion:hover:enabled { border-color: var(--azul); }
.opcion:disabled { cursor: default; }
.opcion.correcta { background: var(--ok-fondo); border-color: var(--ok); }
.opcion.incorrecta { background: var(--mal-fondo); border-color: var(--mal); }

.retro { padding: 10px 14px; border: 1px solid var(--borde); border-radius: var(--radio); }
.retro-ok { background: var(--ok-fondo); border-color: var(--ok); }
.retro-mal { background: var(--mal-fondo); border-color: var(--mal); }

.resultado { text-align: center; }
.puntaje { font-size: 22px; font-weight: bold; }
.pie { text-align: right; margin-top: 15px; }

a { color: var(--titulo); }
.codigo { margin: 0 0 15px 0; padding: 12px 14px; color: var(--codigo-texto); background: var(--codigo-fondo); border-radius: 12px; overflow-x: auto; }

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
