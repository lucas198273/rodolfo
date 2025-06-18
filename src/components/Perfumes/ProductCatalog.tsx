import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "../contexts/CartContext";

interface Perfume {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  notes: string[];
  available: boolean;
}

const ProductCatalog: React.FC = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const { addItem, items } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const perfumes: Perfume[] = [
    {
      id: "p1",
      name: "Flor de Lis",
      price: 199.9,
      imageUrl: "/assets/img1.jpeg",
      description: "A delicate floral fragrance inspired by the elegance of the iris flower.",
      notes: ["Iris", "Jasmine", "Vanilla", "Sandalwood"],
      available: true,
    },
    {
      id: "p2",
      name: "Noite de Verão",
      price: 249.5,
      imageUrl: "/assets/img1.jpeg",
      description: "A vibrant scent capturing the essence of a summer night.",
      notes: ["Bergamot", "Cedarwood", "Amber", "Musk"],
      available: false,
    },
    {
      id: "p3",
      name: "Aurora Boreal",
      price: 299.9,
      imageUrl: "/assets/img1.jpeg",
      description: "Mistério e frescor em uma fragrância única.",
      notes: ["Lavanda s", "Cítricos", "Musgo", "Vetiver"],
      available: true,
    },
    {
      id: "p4",
      name: "Encanto Oriental",
      price: 189.0,
      imageUrl: "/assets/img1.jpeg",
      description: "Toques orientais para mulheres marcantes.",
      notes: ["Canela", "Madeira Oud", "Baunilha", "Rosa"],
      available: true,
    },
  ];

  const handleWhatsApp = (perfume: Perfume) => {
    const message = encodeURIComponent(
      `Olá! Quero comprar os seguintes perfumes: ${items
        .map(item => `${item.name} (R$${item.price.toFixed(2)} x ${item.quantity})`)
        .join(", ")}. Total: R$${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}.`
    );
    return `https://wa.me/5531999999999?text=${message}`;
  };

  const handleAddToCart = (perfume: Perfume) => {
    addItem({
      id: perfume.id,
      name: perfume.name,
      price: perfume.price,
      imageUrl: perfume.imageUrl,
    });
  };

  return (
    <section className="py-16 px-4 bg-white text-blue-900" data-aos="fade-in">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-lg text-blue-900">
          Catálogo de Perfumes
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {perfumes.map((perfume, index) => (
            <div
              key={perfume.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col relative transition-transform hover:scale-[1.03] border-2 border-blue-900"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-48 sm:h-60 md:h-64 overflow-hidden">
                <img
                  src={perfume.imageUrl}
                  alt={perfume.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    perfume.available ? "bg-green-600" : "bg-gray-400"
                  } text-white`}
                >
                  {perfume.available ? "Disponível" : "Indisponível"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              <div className="p-5 text-center flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold mb-1 truncate text-blue-900">
                    {perfume.name}
                  </h3>
                  <p className="text-base font-bold mb-4 text-blue-900">
                    R$ {perfume.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedPerfume(perfume)}
                    className="w-full px-4 py-2 rounded-lg text-white font-semibold transition-colors bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!perfume.available}
                    aria-label={`Ver mais sobre ${perfume.name}`}
                  >
                    {perfume.available ? "Ver Mais" : "Indisponível"}
                  </button>
                  <button
                    onClick={() => handleAddToCart(perfume)}
                    className="w-full px-4 py-2 rounded-lg text-white font-semibold transition-colors bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!perfume.available}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

       {selectedPerfume && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" data-aos="zoom-in" role="dialog">
    <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-lg border-2 border-blue-900">
      <button
        onClick={() => setSelectedPerfume(null)}
        className="absolute top-4 right-4 text-blue-900 hover:text-blue-700"
        aria-label="Fechar modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-900">
        {selectedPerfume.name}
      </h3>
      <img
        src={selectedPerfume.imageUrl}
        alt={selectedPerfume.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-base sm:text-lg mb-4 text-blue-900">
        {selectedPerfume.description}
      </p>

      <div className="mb-4">
        <h4 className="font-semibold text-lg sm:text-xl mb-2 text-blue-900">
          Notas Olfativas
        </h4>
        <ul className="list-disc list-inside text-base sm:text-lg text-blue-900">
          {selectedPerfume.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>

      <p className="font-bold text-lg sm:text-xl mb-4 text-blue-900">
        R$ {selectedPerfume.price.toFixed(2)}
      </p>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleAddToCart(selectedPerfume)}
          className="w-full px-4 py-3 text-white rounded-lg text-center transition-colors bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedPerfume.available}
        >
          Adicionar ao Carrinho
        </button>
        <button
          onClick={() => window.open(handleWhatsApp(selectedPerfume), "_blank")}
          className="w-full px-4 py-3 text-white rounded-lg text-center transition-colors bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedPerfume.available}
        >
          Comprar via WhatsApp
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </section>
  );
};

export default ProductCatalog;