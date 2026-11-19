import { useState } from "react";

export default function Portada({ onStart }) {
  const [audioActivo, setAudioActivo] = useState(true);

  return (
    <main className="portada">
      <style>{css}</style>

      <section className="centro">
        <div className="logo">C++</div>
        <h1>Fundamentos de programación C++</h1>
        <p>Aprende C++ desde cero</p>
        <button className="comenzar" onClick={onStart}>
          Comenzar
        </button>
      </section>
    </main>
  );
}

const css = `
.portada {
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.audio { position: absolute; top: 15px; right: 15px; }
.centro {
  max-width: 500px;
  padding: 40px 30px;
  text-align: center;
  background: var(--tarjeta);
  border: 1px solid var(--borde);
  border-radius: 20px;
}
.logo {
  display: inline-block;
  margin-bottom: 15px;
  padding: 10px 25px;
  font-size: 48px;
  font-weight: bold;
  color: white;
  background: var(--azul);
  border-radius: 16px;
}
h1 { margin: 0 0 10px 0; font-size: 30px; }
p { margin: 0 0 25px 0; font-size: 18px; color: var(--suave); }
.comenzar { padding: 12px 36px; font-size: 18px; border-radius: 25px; }

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
