import React, {type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Cabecera / Navegación */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Fundamentos de C++
          </h1>
          <nav>
            <ul className="flex gap-4 font-medium">
              <li className="hover:text-blue-200 cursor-pointer transition-colors">Inicio</li>
              <li className="hover:text-blue-200 cursor-pointer transition-colors">Lecciones</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenedor Principal donde se renderizarán los componentes hijos */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-8 w-full">
        {children}
      </main>

      {/* Pie de página */}
      <footer className="bg-slate-800 text-slate-300 py-6 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm">
            © {new Date().getFullYear()} 
                <li>
                 <div className = "team">
                 <p>Equipo:</p>             
                 <p>Acosta contreras Cristian Joan</p>
                 <p>Alvarado Encarnación Dylan Ismael</p>
                 <p>García Ramos Edwin Jael</p>
                 <p>Martínez Hernandez Jahaziel</p>
                 <p>Spargo Martínez Julio César.</p>
                 </div>  
                </li> 
            </p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;