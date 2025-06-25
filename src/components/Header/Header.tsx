import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

export default function Header({ onCartClick, cartItemCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 shadow-lg h-20">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Botão do menu mobile */}
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-white focus:outline-none mr-4"
            aria-label="Abrir menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-8 font-semibold text-white text-base">
            <Link to="/" className="hover:text-blue-300 transition-colors">Início</Link>
            <Link to="/about" className="hover:text-blue-300 transition-colors">Sobre</Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-300 transition-colors"
            >
              Todos os Produtos
            </Link>
          </nav>
        </div>

        {/* Logo central */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <Link to="/">
            <img
              src="/assets/logo.jpeg"
              alt="Império dos Aromas"
              className="h-18 object-contain"
              loading="eager"
            />
          </Link>
        </div>

        {/* Carrinho */}
        <button
          onClick={onCartClick}
          className="relative focus:outline-none"
          aria-label="Abrir carrinho"
        >
          <svg
            className="w-6 h-6 text-white hover:text-blue-300 transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16l-2 10H6L4 6zm4 12h8v2H8v-2zm-4-2h16v2H4v-2zm0-8v2h16V8H4z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Menu mobile */}
        {menuOpen && (
          <nav className="md:hidden fixed top-20 left-0 w-full bg-blue-600 shadow-md z-40 px-6 py-4 space-y-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white hover:text-blue-300 transition-colors">Início</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-white hover:text-blue-300 transition-colors">Sobre</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-white hover:text-blue-300 transition-colors">Produtos</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
