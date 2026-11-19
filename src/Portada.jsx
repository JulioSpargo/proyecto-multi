import { useState } from "react";

/**
 * Portada — primer apartado del medio multimedia "Fundamentos de programación C++".
 * Uso:  <Portada onStart={() => setPantalla("introduccion")} />
 */

const CODIGO_FONDO_IZQ = `#include <iostream>
using namespace std;

int main() {
  int edad = 15;
  if (edad >= 18) {
    cout << "Mayor";
  } else {
    cout << "Menor";
  }
  return 0;
}`;

const CODIGO_FONDO_DER = `for (int i = 0; i < 5; i++) {
  cout << i << endl;
}

string nombre = "Ana";
float pi = 3.1416;
bool listo = true;`;

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 200 200" role="img" aria-label="Logotipo de C++">
      <defs>
        <linearGradient id="hex" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4da3ff" />
          <stop offset="1" stopColor="#1b4fd8" />
        </linearGradient>
      </defs>
      {/* Engranes decorativos */}
      <g fill="#6c5bd4" opacity="0.55">
        <circle cx="40" cy="70" r="26" />
        <circle cx="168" cy="52" r="20" />
      </g>
      <g fill="#241b4d">
        <circle cx="40" cy="70" r="11" />
        <circle cx="168" cy="52" r="8" />
      </g>
      {/* Hexágono */}
      <polygon
        points="100,18 170,58 170,142 100,182 30,142 30,58"
        fill="url(#hex)"
        stroke="#bfe0ff"
        strokeWidth="3"
      />
      <text
        x="86"
        y="125"
        textAnchor="middle"
        fontSize="86"
        fontWeight="800"
        fill="#fff"
        fontFamily="Inter, system-ui, sans-serif"
      >
        C
      </text>
      <text
        x="140"
        y="108"
        textAnchor="middle"
        fontSize="34"
        fontWeight="800"
        fill="#fff"
        fontFamily="Inter, system-ui, sans-serif"
      >
        ++
      </text>
    </svg>
  );
}

export default function Portada({ onStart = () => setPantalla("introduccion") }) {
  const [audioActivo, setAudioActivo] = useState(true);

  return (
    <main className="portada">
      <style>{css}</style>

      <pre className="codigo codigo-izq" aria-hidden="true">{CODIGO_FONDO_IZQ}</pre>
      <pre className="codigo codigo-der" aria-hidden="true">{CODIGO_FONDO_DER}</pre>

      <button
        type="button"
        className="audio"
        onClick={() => setAudioActivo((v) => !v)}
        aria-pressed={!audioActivo}
      >
        <span aria-hidden="true">{audioActivo ? "🔊" : "🔇"}</span>
        {audioActivo ? "Audio: Silenciar" : "Audio: Activar"}
      </button>

      <section className="centro">
        <Logo />
        <h1>
          Fundamentos de
          <br />
          programación C++
        </h1>
        <p className="subtitulo">Aprende C++ desde cero</p>
        <button type="button" className="comenzar" onClick={onStart}>
          Comenzar <span aria-hidden="true">›</span>
        </button>
      </section>
    </main>
  );
}

const css = `
.portada {
  --fondo-1: #0f0d24;
  --fondo-2: #2a1f5c;
  --texto: #ffffff;
  --texto-suave: #b9b4d6;
  --azul: #1d6dff;
  --azul-claro: #4da3ff;
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
  font-family: Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
  color: var(--texto);
  background:
    radial-gradient(ellipse at 75% 20%, var(--fondo-2) 0%, transparent 60%),
    radial-gradient(ellipse at 15% 85%, #1a2a6c55 0%, transparent 55%),
    var(--fondo-1);
}

.portada *, .portada *::before, .portada *::after { box-sizing: border-box; }

/* Código decorativo de fondo */
.codigo {
  position: absolute;
  margin: 0;
  font-family: "Fira Code", Consolas, Menlo, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #8f86d8;
  opacity: 0.18;
  pointer-events: none;
  user-select: none;
}
.codigo-izq { left: 3%; bottom: 4%; }
.codigo-der { right: 3%; top: 14%; }

/* Botón de audio */
.audio {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font: inherit;
  font-size: 14px;
  color: var(--texto-suave);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.audio:hover { background: rgba(255, 255, 255, 0.14); color: var(--texto); }

/* Contenido central */
.centro {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 560px;
}

.logo {
  width: clamp(130px, 22vw, 190px);
  height: auto;
  filter: drop-shadow(0 0 28px rgba(77, 163, 255, 0.45));
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 6vw, 3.1rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.subtitulo {
  margin: 14px 0 32px;
  font-size: clamp(1.05rem, 2.4vw, 1.3rem);
  color: var(--texto-suave);
}

.comenzar {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 34px;
  font: inherit;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--azul-claro), var(--azul));
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 8px 26px rgba(29, 109, 255, 0.45);
  transition: transform 0.15s, box-shadow 0.15s;
}
.comenzar:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(29, 109, 255, 0.6); }
.comenzar:active { transform: translateY(0); }

.comenzar:focus-visible,
.audio:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .codigo { font-size: 10px; }
  .codigo-der { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .comenzar, .audio { transition: none; }
}
`;