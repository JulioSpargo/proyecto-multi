import { useState } from "react";

const TIPOS = ["int", "double", "char", "string", "bool"];

const EJ1 = {
  pregunta: "Quieres guardar la temperatura de una persona: 36.6. ¿Qué tipo de dato es el adecuado?",
  opciones: ["int", "double", "char", "bool"],
  correcta: "double",
  explicacion:
    "36.6 tiene decimales, así que necesitas double. Un int solo guarda números enteros.",
};

const EJ2 = [
  { valor: "42", correcta: "int" },
  { valor: "3.5", correcta: "double" },
  { valor: '"Hola"', correcta: "string" },
  { valor: "true", correcta: "bool" },
  { valor: "'Z'", correcta: "char" },
];

const EJ3 = {
  lineas: [
    "int edad = 15;",
    'string nombre = "Ana";',
    'char inicial = "A";',
    "bool listo = true;",
  ],
  correcta: 2,
  explicacion:
    "Un char usa comillas simples: char inicial = 'A'; Las comillas dobles son para string.",
};

const TITULOS = ["Elige el tipo", "Relaciona cada valor", "Encuentra el error"];

function Retro({ ok, texto }) {
  return (
    <p className={ok ? "retro retro-ok" : "retro retro-mal"}>
      <strong>{ok ? "¡Correcto!" : "Casi."}</strong> {texto}
    </p>
  );
}

export default function EjerciciosTipos({ onBack, onNext }) {
  const [paso, setPaso] = useState(0);
  const [aciertos, setAciertos] = useState([null, null, null]);

  const [sel1, setSel1] = useState(null);
  const [sel2, setSel2] = useState({});
  const [comprobado2, setComprobado2] = useState(false);
  const [sel3, setSel3] = useState(null);

  const registrar = (i, ok) => {
    const nuevos = [...aciertos];
    nuevos[i] = ok;
    setAciertos(nuevos);
  };

  const elegir1 = (op) => {
    if (sel1) return;
    setSel1(op);
    registrar(0, op === EJ1.correcta);
  };

  const comprobar2 = () => {
    setComprobado2(true);
    registrar(1, EJ2.every((it, i) => sel2[i] === it.correcta));
  };

  const elegir3 = (i) => {
    if (sel3 !== null) return;
    setSel3(i);
    registrar(2, i === EJ3.correcta);
  };

  const reiniciar = () => {
    setPaso(0);
    setAciertos([null, null, null]);
    setSel1(null);
    setSel2({});
    setComprobado2(false);
    setSel3(null);
  };

  const respondido = [sel1 !== null, comprobado2, sel3 !== null][paso];
  const puntos = aciertos.filter(Boolean).length;
  const todoElegido2 = EJ2.every((_, i) => sel2[i]);

  const claseOpcion = (op) => {
    if (sel1 === null) return "opcion";
    if (op === EJ1.correcta) return "opcion correcta";
    if (op === sel1) return "opcion incorrecta";
    return "opcion";
  };

  const clasePar = (i, it) => {
    if (!comprobado2) return "par";
    return sel2[i] === it.correcta ? "par correcta" : "par incorrecta";
  };

  const claseLinea = (i) => {
    if (sel3 === null) return "linea";
    if (i === EJ3.correcta) return "linea correcta";
    if (i === sel3) return "linea incorrecta";
    return "linea";
  };

  return (
    <main className="ejt">
      <style>{css}</style>

      <header className="barra">
        <button className="volver" onClick={onBack}>Volver</button>
        <span>Ejercicios: tipos de datos</span>
      </header>

      <div className="contenido">
        {paso < 3 && (
          <p className="progreso">
            Ejercicio {paso + 1} de 3
          </p>
        )}

        {paso === 0 && (
          <section>
            <h1>{TITULOS[0]}</h1>
            <p>{EJ1.pregunta}</p>
            <div className="opciones">
              {EJ1.opciones.map((op) => (
                <button
                  key={op}
                  className={claseOpcion(op)}
                  onClick={() => elegir1(op)}
                  disabled={sel1 !== null}
                >
                  {op}
                </button>
              ))}
            </div>
            {sel1 !== null && <Retro ok={aciertos[0]} texto={EJ1.explicacion} />}
          </section>
        )}

        {paso === 1 && (
          <section>
            <h1>{TITULOS[1]}</h1>
            <p>Elige el tipo de dato que corresponde a cada valor.</p>
            <ul className="pares">
              {EJ2.map((it, i) => (
                <li key={it.valor} className={clasePar(i, it)}>
                  <code className="valor">{it.valor}</code>
                  <select
                    value={sel2[i] || ""}
                    onChange={(e) => setSel2({ ...sel2, [i]: e.target.value })}
                    disabled={comprobado2}
                  >
                    <option value="" disabled>Elige...</option>
                    {TIPOS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {comprobado2 && sel2[i] !== it.correcta && (
                    <span className="pista">Era {it.correcta}</span>
                  )}
                </li>
              ))}
            </ul>
            {!comprobado2 ? (
              <button className="boton" onClick={comprobar2} disabled={!todoElegido2}>
                Comprobar
              </button>
            ) : (
              <Retro
                ok={aciertos[1]}
                texto={
                  aciertos[1]
                    ? "Todos correctos. Fíjate: los textos van entre comillas dobles y los caracteres entre simples."
                    : "Revisa los que salieron en rojo. Decimales: double. Enteros: int. Texto: string."
                }
              />
            )}
          </section>
        )}

        {paso === 2 && (
          <section>
            <h1>{TITULOS[2]}</h1>
            <p>Una de estas líneas tiene un error. Haz clic en la línea incorrecta.</p>
            <div className="editor">
              {EJ3.lineas.map((l, i) => (
                <button
                  key={l}
                  className={claseLinea(i)}
                  onClick={() => elegir3(i)}
                  disabled={sel3 !== null}
                >
                  <span className="num">{i + 1}</span>
                  <code>{l}</code>
                </button>
              ))}
            </div>
            {sel3 !== null && <Retro ok={aciertos[2]} texto={EJ3.explicacion} />}
          </section>
        )}

        {paso === 3 && (
          <section className="resultado">
            <h1>¡Terminaste!</h1>
            <p className="puntaje">Tu puntaje: {puntos} de 3</p>
            <p>
              {puntos === 3
                ? "Excelente, dominas los tipos de datos."
                : puntos >= 2
                ? "Muy bien. Repasa lo que fallaste y quedarás listo."
                : "Vas empezando. Vuelve a leer el apartado anterior e inténtalo otra vez."}
            </p>
            <button className="secundario" onClick={reiniciar}>Intentar de nuevo</button>
            <button className="boton" onClick={onNext}>Continuar</button>
          </section>
        )}

        {paso < 3 && respondido && (
          <div className="pie">
            <button className="boton" onClick={() => setPaso(paso + 1)}>
              {paso === 2 ? "Ver resultado" : "Siguiente"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const css = `
.barra {
  max-width: 650px;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--suave);
}

.contenido {
  max-width: 650px;
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

.editor { margin-bottom: 15px; padding: 10px 0; background: var(--codigo-fondo); border-radius: 12px; overflow: hidden; }
.linea { display: block; width: 100%; padding: 5px 15px; text-align: left; color: var(--codigo-texto); background: none; border: none; border-left: 3px solid transparent; cursor: pointer; white-space: pre; }
.linea:hover:enabled { background: rgba(255,255,255,0.1); }
.num { display: inline-block; width: 25px; color: #8a97c4; }

.linea.correcta { background: var(--ok); color: white; }
.linea.incorrecta { background: var(--mal); color: white; }
.pares { margin: 0 0 15px 0; padding: 0; list-style: none; }
.par { display: flex; align-items: center; gap: 15px; padding: 8px 12px; margin-bottom: 8px; background: var(--tarjeta2); border: 1px solid var(--borde); border-radius: var(--radio); }
.par.correcta { background: var(--ok-fondo); border-color: var(--ok); }
.par.incorrecta { background: var(--mal-fondo); border-color: var(--mal); }
.valor { min-width: 80px; font-size: 17px; font-weight: bold; }
.par select { padding: 5px 8px; font-size: 15px; color: var(--texto); background: var(--tarjeta); border: 1px solid var(--borde); border-radius: 8px; }
.pista { color: var(--mal); font-size: 14px; }

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
