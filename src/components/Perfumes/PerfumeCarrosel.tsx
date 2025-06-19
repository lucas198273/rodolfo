import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "../../../contexts/CartContext"; // Importar o contexto do carrinho

interface Perfume {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  notes: string[];
  inStock: boolean;
}

export default function PerfumeCarrousel() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const { addItem } = useCart(); // Hook para acessar a função de adicionar ao carrinho

  const perfumes: Perfume[] = [
    {
      id: "p1",
      name: "Flor de Lis",
      price: 199.9,
      imageUrl: "/assets/masculinos/070-1.webp",
      description:
        "A delicate floral fragrance inspired by the elegance of the iris flower, evoking sophistication and grace.",
      notes: ["Iris", "Jasmine", "Vanilla", "Sandalwood"],
      inStock: true,
    },
    {
      id: "p2",
      name: "Noite de Verão",
      price: 249.5,
      imageUrl: "/assets/masculinos/087-2.webp",
      description:
        "A vibrant and warm scent capturing the essence of a summer night, with citrus and woody undertones.",
      notes: ["Bergamot", "Cedarwood", "Amber", "Musk"],
      inStock: true,
    },
    {
      id: "p3",
      name: "Étoile d’Or",
      price: 299.0,
      imageUrl: "/assets/masculinos/136-1.webp",
      description:
        "A luxurious fragrance with sparkling top notes and a rich, golden heart, perfect for evening wear.",
      notes: ["Champagne", "Rose", "Oud", "Patchouli"],
      inStock: false,
    },{
      id: "p4",
      name: "Étoile d’Or",
      price: 299.0,
      imageUrl: "/assets/masculinos/387-1.webp",
      description:
        "A luxurious fragrance with sparkling top notes and a rich, golden heart, perfect for evening wear.",
      notes: ["Champagne", "Rose", "Oud", "Patchouli"],
      inStock: false,
    },


  ];

  const phoneNumber = "5531999999999";
  const handleWhatsApp = (perfume: Perfume) => {
    const mensagem = encodeURIComponent(
      `Olá! Tenho interesse no perfume "${perfume.name}" por R$${perfume.price.toFixed(2)}.`
    );
    return `https://wa.me/${phoneNumber}?text=${mensagem}`;
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
    <section
      className="relative bg-gradient-to-r from-blue-950 to-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
      data-aos="fade-in"
      style={{
        backgroundImage: "url(/assets/texture.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center tracking-tight"
          data-aos="fade-up"
        >
          Perfumes em Destaque
        </h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 sm:gap-8">
              {perfumes.map((perfume, index) => (
                <div
                  key={perfume.id}
                  className="flex-none w-[90%] sm:w-[50%] md:w-[33%] lg:w-[22%] min-w-[260px] max-w-sm mx-auto"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="group bg-white/95 rounded-3xl overflow-hidden shadow-2xl h-[420px] sm:h-[500px] md:h-[540px] flex flex-col transition-all duration-300 hover:shadow-yellow-400/40 border border-yellow-300">
                    <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden">
                      <img
                        src={perfume.imageUrl}
                        alt={perfume.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between text-center">
                      <div>
                        <p className="font-semibold text-base sm:text-lg text-blue-900">
                          {perfume.name}
                        </p>
                        <p className="font-bold text-sm sm:text-base text-yellow-600">
                          R$ {perfume.price.toFixed(2)}
                        </p>
                        <p
                          className={`mt-2 text-sm font-medium ${
                            perfume.inStock ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {perfume.inStock ? "Disponível em estoque" : "Não disponível"}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col gap-3">
                        <button
                          onClick={() => setSelectedPerfume(perfume)}
                          className="w-full px-4 py-2 text-sm font-semibold rounded-lg transition-colors bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                        >
                          Ver Mais
                        </button>
                        <button
                          onClick={() => handleAddToCart(perfume)}
                          className="w-full px-4 py-2 text-sm font-semibold rounded-lg text-center bg-blue-900 text-white hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                          disabled={!perfume.inStock}
                        >
                          Adicionar ao Carrinho
                        </button>
                        {perfume.inStock ? (
                          <button
                            onClick={() => window.open(handleWhatsApp(perfume), "_blank")}
                            className="w-full px-4 py-2 text-sm font-semibold rounded-lg text-center bg-green-700 text-white hover:bg-green-800"
                          >
                            Comprar via WhatsApp
                          </button>
                        ) : (
                          <button
                            onClick={() => window.open(handleWhatsApp(perfume), "_blank")}
                            className="w-full px-4 py-2 text-sm font-semibold rounded-lg text-center bg-green-700 text-blue-900 hover:bg-yellow-300"
                          >
                            Encomendar via WhatsApp
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 p-3 rounded-full shadow-lg z-10 bg-blue-900 text-white hover:bg-blue-800"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 p-3 rounded-full shadow-lg z-10 bg-blue-900 text-white hover:bg-blue-800"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedPerfume && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          role="dialog"
        >
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl border-2 border-yellow-400 shadow-2xl">
            <button
              onClick={() => setSelectedPerfume(null)}
              className="absolute top-4 right-4 text-blue-900 hover:text-red-500"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>
            <div className="p-5 sm:p-6 md:p-8 text-blue-900">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                {selectedPerfume.name}
              </h3>
              <img
                src={selectedPerfume.imageUrl}
                alt={selectedPerfume.name}
                className="w-full h-56 sm:h-64 object-cover rounded-xl mb-4 border border-yellow-300"
              />
              <p className="text-sm sm:text-base mb-4">{selectedPerfume.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">
                  Notas Olfativas:
                </h4>
                <ul className="list-disc list-inside text-sm sm:text-base">
                  {selectedPerfume.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
              <p className="font-bold text-lg text-yellow-600 mb-2">
                R$ {selectedPerfume.price.toFixed(2)}
              </p>
              <p
                className={`text-sm font-medium mb-4 ${
                  selectedPerfume.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {selectedPerfume.inStock
                  ? "Disponível em estoque"
                  : "Não disponível"}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleAddToCart(selectedPerfume)}
                  className="w-full px-4 py-3 text-sm rounded-lg text-center bg-blue-900 text-white hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!selectedPerfume.inStock}
                >
                  Adicionar ao Carrinho
                </button>
                {selectedPerfume.inStock ? (
                  <button
                    onClick={() => window.open(handleWhatsApp(selectedPerfume), "_blank")}
                    className="w-full px-4 py-3 text-sm rounded-lg text-center bg-green-700 text-white hover:bg-green-800"
                  >
                    Comprar via WhatsApp
                  </button>
                ) : (
                  <button
                    onClick={() => window.open(handleWhatsApp(selectedPerfume), "_blank")}
                    className="w-full px-4 py-3 text-sm rounded-lg text-center bg-green-700 text-blue-900 hover:bg-yellow-300"
                  >
                    Encomendar via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}