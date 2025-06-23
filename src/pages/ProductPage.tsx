import { useState } from "react";
import { useParams } from "react-router-dom";
import { perfumes } from "../data/Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const initial = perfumes.find((p) => p.id === id) || perfumes[0];
  const [selectedPerfume, setSelectedPerfume] = useState(initial);
  const [showDetails, setShowDetails] = useState(false);

  const handleProductClick = (id: string) => {
    const p = perfumes.find((x) => x.id === id);
    if (p) {
      setSelectedPerfume(p);
      setShowDetails(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-blue-900">
      {/* Exibição do Produto Selecionado */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-full md:w-1/3 transform scale-[0.6]">
          <img
            src={selectedPerfume.imageUrl}
            alt={selectedPerfume.name}
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{selectedPerfume.name}</h1>
          <p className="mb-4">{selectedPerfume.description}</p>
          <p className="text-lg font-bold">R$ {selectedPerfume.price.toFixed(2)}</p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg"
          >
            {showDetails ? "Ocultar Detalhes" : "Exibir Sobre"}
          </button>
          {showDetails && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Notas Olfativas:</h2>
              <ul className="list-disc pl-5">
                {selectedPerfume.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Carrossel */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Produtos Relacionados</h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          centerMode
          centerSlidePercentage={30}
          emulateTouch
          showStatus={false}
          showIndicators={false}
          dynamicHeight={false}
        >
          {perfumes.map((p) => (
            <div
              key={p.id}
              className="cursor-pointer p-2"
              onClick={() => handleProductClick(p.id)}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-32 object-contain rounded-lg shadow"
              />
              <p className="mt-2 text-center font-medium">{p.name}</p>
              <p className="text-center font-bold">R$ {p.price.toFixed(2)}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ProductPage;
