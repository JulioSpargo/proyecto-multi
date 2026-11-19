import { useState } from "react";

const TIPOS = [
  {
    id: "int",
    nombre: "int",
    guarda: "Números enteros",
    ejemplo: "edad = 15",
    nombreIni: "edad",
    valorIni: "15",
    color: "#3b82f6",
    valida: (v) => /^-?\d+$/.test(v),
    ayuda: "Escribe un número entero, sin punto decimal. Ejemplo: 15",
    formato: (v) => v,
  },
  {
    id: "double",
    nombre: "double",
    guarda: "Números con decimales",
    ejemplo: "precio = 19.99",
    nombreIni: "precio",
    valorIni: "19.99",
    color: "#a066e0",
    valida: (v) => /^-?\d+(\.\d+)?$/.test(v),
    ayuda: "Escribe un número, con o sin decimales. Ejemplo: 19.99",
    formato: (v) => v,
  },
  {
    id: "char",
    nombre: "char",
    guarda: "Una sola letra o símbolo",
    ejemplo: "inicial = 'A'",
    nombreIni: "inicial",
    valorIni: "A",
    color: "#e8803a",
    valida: (v) => v.length === 1,
    ayuda: "Escribe exactamente un carácter. Ejemplo: A",
    formato: (v) => `'${v}'`,
  },
  {
    id: "string",
    nombre: "string",
    guarda: "Texto",
    ejemplo: 'nombre = "Ana"',
    nombreIni: "nombre",
    valorIni: "Ana",
    color: "#2fa56a",
    valida: (v) => v.length > 0,
    ayuda: "Escribe cualquier texto. Ejemplo: Ana",
    formato: (v) => `"${v}"`,
  },
  {
    id: "bool",
    nombre: "bool",
    guarda: "Verdadero o falso",
    ejemplo: "aprobado = true",
    nombreIni: "aprobado",
    valorIni: "true",
    color: "#e0505f",
    valida: (v) => v === "true" || v === "false",
    ayuda: "Escribe true o false (en minúsculas).",
    formato: (v) => v,
  },
];

const REGLAS = [
  { ok: true, texto: "Puede tener letras, números y guion bajo", ej: "puntaje_1" },
  { ok: true, texto: "Debe empezar con letra o guion bajo", ej: "_total" },
  { ok: false, texto: "No puede empezar con número", ej: "1edad" },
  { ok: false, texto: "No puede llevar espacios", ej: "mi edad" },
  { ok: false, texto: "No puede ser una palabra reservada", ej: "int" },
];

function Caja({ tipo, nombre, valor, valido }) {
  return (
    <div className="caja-contenedor">
      <div className="caja-nombre" style={{ background: tipo.color }}>
        {nombre || "nombre"}
      </div>
      <div className="caja" style={{ borderColor: tipo.color }}>
        <div style={{ color: tipo.color }}>{tipo.nombre}</div>
        <div className="caja-valor">{valido ? tipo.formato(valor) : "?"}</div>
      </div>
      <p className="caja-texto">Una variable es una caja con nombre y tipo que guarda un valor.</p>
    </div>
  );
}

export default function Variables({ onBack, onNext }) {
  const [tipoId, setTipoId] = useState("int");
  const tipo = TIPOS.find((t) => t.id === tipoId);
  const [nombre, setNombre] = useState(tipo.nombreIni);
  const [valor, setValor] = useState(tipo.valorIni);

  const elegir = (t) => {
    setTipoId(t.id);
    setNombre(t.nombreIni);
    setValor(t.valorIni);
  };

  const nombreValido = /^[A-Za-z_][A-Za-z0-9_]*$/.test(nombre);
  const valorValido = tipo.valida(valor);
  const linea = `${tipo.nombre} ${nombre || "nombre"} = ${valorValido ? tipo.formato(valor) : "???"};`;

  return (
    <main className="vars">
      <style>{css}</style>

      <header className="barra">
        <button className="volver" onClick={onBack}>Volver</button>
        <span>Variables y tipos de datos</span>
      </header>

      <div className="contenido">
        <section>
          <h1>Variables y tipos de datos</h1>
          <p>
            Un programa necesita recordar información: tu edad, un puntaje, un nombre. Para eso
            usamos <strong>variables</strong>. Cada una tiene un <strong>tipo</strong>, que dice qué
            clase de dato puede guardar.
          </p>
        </section>

        <section>
          <h2>Los tipos básicos</h2>
          <div className="tipos">
            {TIPOS.map((t) => (
              <div key={t.id} className="tipo" style={{ borderTopColor: t.color }}>
                <code className="tipo-nombre" style={{ color: t.color }}>{t.nombre}</code>
                <strong>{t.guarda}</strong>
                <code>{t.ejemplo}</code>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Cómo se declara una variable</h2>
          <p>Se escribe el tipo, el nombre y, con el signo =, el valor inicial.</p>
          <pre className="formato">tipo nombre = valor;</pre>
          <p className="aviso">
            Para usar <code>string</code> necesitas <code>#include &lt;string&gt;</code> al inicio del
            programa.
          </p>
        </section>

        <section>
          <h2>Pruébalo tú</h2>
          <p>Elige un tipo, cambia el nombre y el valor, y mira cómo queda tu código.</p>

          <div className="selector">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                className={t.id === tipoId ? "chip activo" : "chip"}
                onClick={() => elegir(t)}
              >
                {t.nombre}
              </button>
            ))}
          </div>

          <div className="laboratorio">
            <div className="campos">
              <label>
                Nombre de la variable
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </label>
              <label>
                Valor
                <input value={valor} onChange={(e) => setValor(e.target.value)} />
              </label>
              {!nombreValido && (
                <p className="error">
                  Nombre no válido: usa letras, números o _, sin espacios, y no empieces con número.
                </p>
              )}
              {!valorValido && <p className="error">{tipo.ayuda}</p>}
            </div>
            <Caja tipo={tipo} nombre={nombre} valor={valor} valido={valorValido} />
          </div>

          <pre className={nombreValido && valorValido ? "codigo" : "codigo invalido"}>{linea}</pre>
        </section>

        <section>
          <h2>Reglas para nombrar variables</h2>
          <ul className="reglas">
            {REGLAS.map((r) => (
              <li key={r.texto}>
                <span className={r.ok ? "bien" : "mal"}>{r.ok ? "Sí" : "No"}</span>
                {r.texto} <code>{r.ej}</code>
              </li>
            ))}
          </ul>
          <p>C++ distingue mayúsculas de minúsculas: <code>edad</code> y <code>Edad</code> son variables distintas.</p>
        </section>

        <div className="pie">
          <button className="siguiente" onClick={onNext}>Continuar</button>
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

.tipos { display: flex; flex-wrap: wrap; gap: 10px; }
.tipo { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 5px; padding: 12px; background: var(--tarjeta2); border: 1px solid var(--borde); border-top: 5px solid; border-radius: 12px; }
.tipo-nombre { font-size: 20px; font-weight: bold; }
.formato { margin: 0 0 10px 0; padding: 15px; font-size: 20px; text-align: center; background: var(--tarjeta2); border: 1px solid var(--borde); border-radius: 12px; }
.aviso { padding: 10px 14px; background: var(--aviso); border: 1px solid var(--borde); border-radius: var(--radio); }
.selector { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
.chip { padding: 6px 16px; font-family: Consolas, monospace; font-size: 15px; color: var(--texto); background: var(--tarjeta2); border: 1px solid var(--borde); border-radius: 20px; cursor: pointer; }
.chip:hover { border-color: var(--azul); }
.chip.activo { color: white; background: var(--azul); border-color: var(--azul); }
.laboratorio { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 15px; }
.campos { flex: 1; min-width: 250px; }
.campos label { display: block; margin-bottom: 10px; }
.campos input { display: block; box-sizing: border-box; width: 100%; margin-top: 4px; padding: 8px 10px; font-family: Consolas, monospace; font-size: 15px; color: var(--texto); background: var(--tarjeta2); border: 1px solid var(--borde); border-radius: var(--radio); }
.campos input:focus { outline: none; border-color: var(--azul); }
.error { color: var(--mal); font-size: 14px; }
.caja-contenedor { width: 200px; text-align: center; }
.caja-nombre { display: inline-block; padding: 3px 12px; font-family: Consolas, monospace; color: white; border-radius: 8px 8px 0 0; }
.caja { padding: 15px; background: var(--tarjeta2); border: 3px solid; border-radius: 12px; }
.caja-valor { font-family: Consolas, monospace; font-size: 24px; font-weight: bold; word-break: break-all; }
.caja-texto { margin-top: 8px; font-size: 13px; color: var(--suave); }
.codigo { margin: 0; padding: 12px 14px; font-size: 18px; color: var(--salida); background: var(--codigo-fondo); border-radius: var(--radio); }
.codigo.invalido { color: #ff8a9d; }
.reglas { margin: 0 0 10px 0; padding-left: 20px; }
.reglas li { margin-bottom: 8px; }
.bien { margin-right: 8px; font-weight: bold; color: var(--ok); }
.mal { margin-right: 8px; font-weight: bold; color: var(--mal); }
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
