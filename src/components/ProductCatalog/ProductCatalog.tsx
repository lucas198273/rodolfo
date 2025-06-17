import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const perfumes: Perfume[] = [
    {
      id: "p1",
      name: "Flor de Lis",
      price: 199.9,
      imageUrl: "/assets/img1.jpeg",
      description:
        "A delicate floral fragrance inspired by the elegance of the iris flower.",
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
    },    {
      id: "p3",
      name: "Noite de Verão",
      price: 249.5,
      imageUrl: "/assets/img1.jpeg",
      description: "A vibrant scent capturing the essence of a summer night.",
      notes: ["Bergamot", "Cedarwood", "Amber", "Musk"],
      available: false,
    }, {
      id: "p4",
      name: "Noite de Verão",
      price: 249.5,
      imageUrl: "/assets/img1.jpeg",
      description: "A vibrant scent capturing the essence of a summer night.",
      notes: ["Bergamot", "Cedarwood", "Amber", "Musk"],
      available: false,
    },
    // outros perfumes...
  ];

  const borderBlue = "#1e3a8a"; // Azul escuro para bordas e detalhes

  return (
    <section
      className="py-16 px-4"
      style={{
        backgroundColor: "#fff",
        color: borderBlue,
      }}
      data-aos="fade-in"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          style={{ textShadow: "1px 1px 3px rgba(30, 58, 138, 0.4)" }}
        >
          Catálogo de Perfumes
        </h2>

        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          data-aos="zoom-in"
        >
          {perfumes.map((perfume, index) => (
            <div
              key={perfume.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col relative transition-transform hover:scale-[1.03]"
              style={{
                border: `2px solid ${borderBlue}`,
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-48 sm:h-60 md:h-64 overflow-hidden">
                <img
                  src={perfume.imageUrl}
                  alt={perfume.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badge Disponibilidade */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    perfume.available
                      ? "bg-green-600 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {perfume.available ? "Disponível" : "Indisponível"}
                </span>

                <div
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ backdropFilter: "blur(2px)" }}
                />
              </div>

              <div className="p-5 text-center flex flex-col justify-between flex-grow">
                <h3
                  className="text-lg font-semibold mb-1 truncate"
                  style={{ color: borderBlue }}
                >
                  {perfume.name}
                </h3>
                <p className="text-base font-bold mb-4" style={{ color: "#1e3a8a" }}>
                  R$ {perfume.price.toFixed(2)}
                </p>

                <button
                  onClick={() => setSelectedPerfume(perfume)}
                  className="mt-auto px-4 py-2 rounded-lg text-white font-semibold transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: perfume.available ? borderBlue : "#aaa",
                  }}
                  disabled={!perfume.available}
                  aria-label={`Ver mais sobre ${perfume.name}`}
                >
                  {perfume.available ? "Ver Mais" : "Indisponível"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPerfume && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            data-aos="zoom-in"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-lg"
              style={{ border: `2px solid ${borderBlue}` }}
            >
              <button
                onClick={() => setSelectedPerfume(null)}
                className="absolute top-4 right-4 text-blue-900 hover:text-blue-700"
                aria-label="Fechar modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: borderBlue }}
              >
                {selectedPerfume.name}
              </h3>
              <img
                src={selectedPerfume.imageUrl}
                alt={selectedPerfume.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-base sm:text-lg mb-4" style={{ color: borderBlue }}>
                {selectedPerfume.description}
              </p>

              <div className="mb-4">
                <h4
                  className="font-semibold text-lg sm:text-xl mb-2"
                  style={{ color: borderBlue }}
                >
                  Notas Olfativas
                </h4>
                <ul
                  className="list-disc list-inside text-base sm:text-lg"
                  style={{ color: borderBlue }}
                >
                  {selectedPerfume.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-lg sm:text-xl mb-4" style={{ color: "#1e3a8a" }}>
                R$ {selectedPerfume.price.toFixed(2)}
              </p>

              <a
                href={`https://wa.me/5531999999999?text=Olá! Tenho interesse no perfume "${selectedPerfume.name}" por R$${selectedPerfume.price.toFixed(2)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block px-4 py-3 text-white rounded-lg text-center transition-colors"
                style={{
                  backgroundColor: selectedPerfume.available ? borderBlue : "#aaa",
                }}
              >
                {selectedPerfume.available
                  ? "Comprar via WhatsApp"
                  : "Indisponível no momento"}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
