import { useParams } from "react-router-dom";
import { perfumes } from "../data/Product";
import { Carousel } from "react-responsive-carousel";
import './ProductPage.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductPage = () => {
  const { id } = useParams();
  const perfume = perfumes.find((p) => p.id === id);

  if (!perfume) {
    return <p className="text-center mt-20 text-red-500">Perfume não encontrado.</p>;
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-blue-900">
      {/* Exibição do Produto Selecionado */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-full md:w-1/2">
          <img
            src={perfume.imageUrl}
            alt={perfume.name}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{perfume.name}</h1>
          <p className="mb-4">{perfume.description}</p>
          <h2 className="text-xl font-semibold mb-2">Notas Olfativas:</h2>
          <ul className="list-disc pl-5 mb-4">
            {perfume.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
          <p className="text-lg font-bold">R$ {perfume.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Carrossel de Produtos Relacionados */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Produtos Relacionados</h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={3000}
          transitionTime={500}
          showStatus={false}
          showIndicators={false}
        >
          {perfumes.map((relatedPerfume) => (
            <div key={relatedPerfume.id} className="flex justify-center">
              <img
                src={relatedPerfume.imageUrl}
                alt={relatedPerfume.name}
                className="w-32 h-32 object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ProductPage;
