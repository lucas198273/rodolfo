import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "../../../contexts/CartContext";
import { toast } from "react-toastify";

interface Camiseta {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
}

export default function CamisetaCarrousel() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    dragFree: false,
    slidesToScroll: 1,
  });

  const [selectedCamiseta, setSelectedCamiseta] = useState<Camiseta | null>(null);
  const { addItem } = useCart();

  const camisetas: Camiseta[] = [
    {
      id: "c1",
      name: "Camiseta Estampada Azul",
      price: 89.90,
      imageUrl: "/assets/image.png", // Substitua pelo caminho real
      description: "Camiseta com estampa moderna em azul, ideal para o dia a dia.",
      inStock: true,
    },
    {
      id: "c2",
      name: "Camiseta Estampada Verde",
      price: 99.50,
      imageUrl: "/assets/image.png", // Substitua pelo caminho real
      description: "Camiseta com estampa vibrante em verde, perfeita para eventos casuais.",
      inStock: true,
    },
    {
      id: "c3",
      name: "Camiseta Estampada Preta",
      price: 109.00,
      imageUrl: "/assets/image.png", // Substitua pelo caminho real
      description: "Camiseta com estampa elegante em preto, ideal para noites especiais.",
      inStock: false,
    },
    {
      id: "c4",
      name: "Camiseta Estampada Cinza",
      price: 94.90,
      imageUrl: "/assets/image.png", // Substitua pelo caminho real
      description: "Camiseta com estampa minimalista em cinza, versátil para qualquer ocasião.",
      inStock: true,
    },
  ];

  const phoneNumber = "5531983703055"; // Atualizado para o número do Hero
  const handleWhatsApp = (camiseta: Camiseta) => {
    const mensagem = encodeURIComponent(
      `Olá! Tenho interesse na camiseta "${camiseta.name}" por R$${camiseta.price.toFixed(2)}.`
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${mensagem}`;
    window.open(whatsappLink, "_blank");
    toast.info(`Mensagem enviada para o WhatsApp sobre ${camiseta.name}!`, {
      position: "top-right",
      autoClose: 3000,
      className: "bg-blue-900 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
    });
    return whatsappLink;
  };

  const handleAddToCart = (camiseta: Camiseta) => {
    if (camiseta.inStock) {
      addItem({
        id: camiseta.id,
        name: camiseta.name,
        price: camiseta.price,
        imageUrl: camiseta.imageUrl,
      });
      toast.success(`${camiseta.name} adicionada ao carrinho!`, {
        position: "top-right",
        autoClose: 3000,
        className: "bg-green-600 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
      });
    } else {
      toast.error("Esta camiseta não está disponível no estoque!", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-500 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
      });
    }
  };

  return (
    <section
      className="relative bg-gradient-to-r from-blue-900 to-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
      data-aos="fade-in"
      style={{
        backgroundImage: "url(/assets/texture.jpg)",
        backgroundSize: "cover",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-blue-900 drop-shadow-lg mb-12 text-center tracking-tight"
          data-aos="fade-up"
        >
          Camisetas em Destaque
        </h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 sm:gap-8 px-1 sm:px-0 ml-2 sm:ml-0">
              {camisetas.map((camiseta, index) => (
                <div
                  key={camiseta.id}
                  className="flex-none w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%] min-w-[250px] mx-auto transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="group bg-white/95 rounded-3xl overflow-hidden shadow-lg h-[350px] sm:h-[400px] md:h-[450px] flex flex-col hover:shadow-xl border border-blue-300">
                    <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden">
                      <img
                        src={camiseta.imageUrl}
                        alt={camiseta.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between text-center">
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-blue-900">
                          {camiseta.name}
                        </p>
                        <p className="font-bold text-xs sm:text-sm text-blue-600">
                          R$ {camiseta.price.toFixed(2)}
                        </p>
                        <p
                          className={`mt-1 text-xs sm:text-sm ${
                            camiseta.inStock ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {camiseta.inStock ? "Disponível em estoque" : "Não disponível"}
                        </p>
                      </div>
                      <div className="mt-2 flex flex-col gap-2">
                        <button
                          onClick={() => setSelectedCamiseta(camiseta)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors bg-yellow-600 text-blue-900 hover:bg-yellow-500"
                        >
                          Ver Mais
                        </button>
                        <button
                          onClick={() => handleAddToCart(camiseta)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg text-center bg-blue-700 text-white hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                          disabled={!camiseta.inStock}
                        >
                          Adicionar ao Carrinho
                        </button>
                        {camiseta.inStock ? (
                          <button
                            onClick={() => handleWhatsApp(camiseta)}
                            className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg text-center bg-green-700 text-white hover:bg-green-800"
                          >
                            Comprar via WhatsApp
                          </button>
                        ) : (
                          <button
                            onClick={() => handleWhatsApp(camiseta)}
                            className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg text-center bg-green-700 text-blue-900 hover:bg-blue-300"
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

          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 p-3 rounded-full shadow-lg z-10 bg-blue-900 text-white hover:bg-blue-800"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 p-3 rounded-full shadow-lg z-10 bg-blue-900 text-white hover:bg-blue-800"
            aria-label="Próximo slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {selectedCamiseta && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          role="dialog"
        >
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-xl border-2 border-blue-400 shadow-xl">
            <button
              onClick={() => setSelectedCamiseta(null)}
              className="absolute top-2 right-2 text-blue-900 hover:text-red-500"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
            <div className="p-4 sm:p-5 md:p-6 text-blue-900">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                {selectedCamiseta.name}
              </h3>
              <img
                src={selectedCamiseta.imageUrl}
                alt={selectedCamiseta.name}
                className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-lg mb-2 border border-blue-300"
              />
              <p className="text-xs sm:text-sm mb-2">{selectedCamiseta.description}</p>
              <p className="font-bold text-base sm:text-lg text-blue-600 mb-1">
                R$ {selectedCamiseta.price.toFixed(2)}
              </p>
              <p
                className={`text-xs sm:text-sm mb-2 ${
                  selectedCamiseta.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {selectedCamiseta.inStock ? "Disponível em estoque" : "Não disponível"}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(selectedCamiseta)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg text-center bg-blue-700 text-white hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!selectedCamiseta.inStock}
                >
                  Adicionar ao Carrinho
                </button>
                {selectedCamiseta.inStock ? (
                  <button
                    onClick={() => handleWhatsApp(selectedCamiseta)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg text-center bg-green-700 text-white hover:bg-green-800"
                  >
                    Comprar via WhatsApp
                  </button>
                ) : (
                  <button
                    onClick={() => handleWhatsApp(selectedCamiseta)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg text-center bg-green-700 text-blue-900 hover:bg-blue-300"
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