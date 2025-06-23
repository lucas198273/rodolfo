import { useState } from "react";
import { useParams } from "react-router-dom";
import { perfumes } from "../data/Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={selectedPerfume.imageUrl}
            alt={selectedPerfume.name}
            className="w-full max-w-[16rem] sm:max-w-xs md:max-w-sm h-auto object-contain rounded-lg shadow-lg border-4 border-blue-500 mx-auto"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold text-blue-600">{selectedPerfume.name}</h1>
          <p className="text-blue-800">{selectedPerfume.description}</p>
          <p className="text-xl font-bold text-yellow-600">
            R$ {selectedPerfume.price.toFixed(2)}
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
          >
            {showDetails ? "Ocultar Detalhes" : "Exibir Sobre"}
          </button>
          {showDetails && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h2 className="text-lg font-semibold text-blue-700">Notas Olfativas:</h2>
              <ul className="list-disc pl-6 text-blue-800">
                {selectedPerfume.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Carrossel */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 inline-block">
          Produtos Relacionados
        </h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          centerMode
          centerSlidePercentage={33.33}
          emulateTouch
          showStatus={false}
          showIndicators={false}
          dynamicHeight={false}
          className="carousel-custom mx-auto"
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
                className="w-full h-32 object-contain rounded-md shadow-md border-2 border-blue-400 mx-auto"
              />
              <p className="mt-2 text-center font-medium text-blue-700">{p.name}</p>
              <p className="text-center font-bold text-yellow-600">R$ {p.price.toFixed(2)}</p>
            </div>
          ))}
        </Carousel>
      </div>

     
    </section>
  );
};

export default ProductPage;