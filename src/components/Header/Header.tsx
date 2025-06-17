import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1321] shadow-lg h-20">
      <div className="max-w-7xl mx-auto h-full px-6 relative flex items-center justify-between">

        {/* Botão Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-white focus:outline-none z-10"
          aria-label="Abrir menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Logo centralizada */}
        <div className="absolute left-1/2 top-1/2 mt-1 transform -translate-x-1/2 -translate-y-1/2 md:block">
          <Link to="/">
            <img
              src="/assets/logo.jpeg"
              alt="Império dos Aromas"
              className="h-28 w-auto object-contain"
              loading="eager"
            />
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-8 font-semibold text-white ml-auto text-base">
          <Link to="/" className="hover:text-[#3fa9f5] transition">Início</Link>
          <Link to="/about" className="hover:text-[#3fa9f5] transition">Sobre</Link>
        </nav>

        {/* Espaço Mobile para equilíbrio */}
        <div className="w-8 md:hidden" />
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <nav className="md:hidden fixed top-20 left-0 w-full bg-[#0d1321] shadow-md z-40 px-6 py-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white hover:text-[#3fa9f5] transition">Início</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-white hover:text-[#3fa9f5] transition">Sobre</Link>
        </nav>
      )}
    </header>
  );
}
''