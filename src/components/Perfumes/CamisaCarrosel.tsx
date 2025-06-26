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
  basePrice: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  colors: string[];
  sizes: string[];
  materials: string[];
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
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();

  const camisetas: Camiseta[] = [
    {
      id: "c1",
      name: "Camiseta Estampada Azul",
      basePrice: 75,
      imageUrl: "/assets/image.png",
      description: "Camiseta com estampa moderna, ideal para o dia a dia.",
      inStock: true,
      colors: ["Azul", "Branco", "Preto"],
      sizes: ["P", "M", "G", "GG"],
      materials: ["Algodão", "Poliéster", "Mistura"],
    },
    {
      id: "c2",
      name: "Camiseta Estampada Verde",
      basePrice: 75,
      imageUrl: "/assets/image.png",
      description: "Camiseta com estampa vibrante, perfeita para eventos casuais.",
      inStock: true,
      colors: ["Verde", "Cinza", "Vermelho"],
      sizes: ["P", "M", "G", "GG"],
      materials: ["Algodão", "Poliéster"],
    },
    {
      id: "c3",
      name: "Camiseta Estampada Preta",
      basePrice: 75,
      imageUrl: "/assets/image.png",
      description: "Camiseta com estampa elegante, ideal para noites especiais.",
      inStock: false,
      colors: ["Preto", "Branco"],
      sizes: ["M", "G", "GG"],
      materials: ["Algodão"],
    },
    {
      id: "c4",
      name: "Camiseta Estampada Cinza",
      basePrice: 75,
      imageUrl: "/assets/image.png",
      description: "Camiseta com estampa minimalista, versátil para qualquer ocasião.",
      inStock: true,
      colors: ["Cinza", "Azul", "Branco"],
      sizes: ["P", "M", "G"],
      materials: ["Algodão", "Mistura"],
    },
  ];

  const getPricePerUnit = (quantity: number) => {
    if (quantity >= 50) return 45;
    if (quantity >= 15) return 50;
    if (quantity >= 5) return 60;
    return 75;
  };

  const phoneNumber = "5531983703055";
  const handleWhatsApp = (camiseta: Camiseta) => {
    const pricePerUnit = getPricePerUnit(quantity);
    const totalPrice = pricePerUnit * quantity;
    const message = encodeURIComponent(
      `Olá! Quero comprar: ${camiseta.name} x${quantity} (Cor: ${selectedColor}, Tamanho: ${selectedSize}, Material: ${selectedMaterial}). Total: R$${totalPrice.toFixed(2)}.`
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
    toast.info(`Mensagem enviada para o WhatsApp sobre ${camiseta.name}!`, {
      position: "top-right",
      autoClose: 3000,
      className: "bg-blue-900 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
    });
    return whatsappLink;
  };

  const handleAddToCart = (camiseta: Camiseta) => {
    if (!selectedColor || !selectedSize || !selectedMaterial) {
      toast.error("Por favor, selecione cor, tamanho e material!", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-500 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
      });
      return;
    }
    if (camiseta.inStock) {
      const pricePerUnit = getPricePerUnit(quantity);
      addItem({
        id: `${camiseta.id}-${selectedColor}-${selectedSize}-${selectedMaterial}`,
        name: `${camiseta.name} (${selectedColor}, ${selectedSize}, ${selectedMaterial})`,
        price: pricePerUnit,
        imageUrl: camiseta.imageUrl,
        quantity: quantity, // Added quantity here
        color: selectedColor,
        size: selectedSize,
        material: selectedMaterial,
      });
      toast.success(`${camiseta.name} adicionada ao carrinho!`, {
        position: "top-right",
        autoClose: 3000,
        className: "bg-emerald-500 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
      });
      setSelectedCamiseta(null);
      setSelectedColor("");
      setSelectedSize("");
      setSelectedMaterial("");
      setQuantity(1);
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
          Camisetas Personalizadas
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
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-lg h-[480px] flex flex-col hover:shadow-xl border border-blue-900/20">
                    <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden">
                      <img
                        src={camiseta.imageUrl}
                        alt={camiseta.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between text-center">
                      <div className="space-y-2">
                        <p className="font-semibold text-base text-blue-900">{camiseta.name}</p>
                        <p className="font-bold text-sm text-emerald-500">
                          A partir de R$ {getPricePerUnit(1).toFixed(2)}/un
                        </p>
                        <p
                          className={`text-xs ${
                            camiseta.inStock ? "text-emerald-500" : "text-red-500"
                          }`}
                        >
                          {camiseta.inStock ? "Disponível para personalização" : "Não disponível"}
                        </p>
                        <div className="space-y-2">
                          <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                            disabled={!camiseta.inStock}
                          >
                            <option value="">Selecione a cor</option>
                            {camiseta.colors.map((color) => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                          <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                            disabled={!camiseta.inStock}
                          >
                            <option value="">Selecione o tamanho</option>
                            {camiseta.sizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                          <select
                            value={selectedMaterial}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                            className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                            disabled={!camiseta.inStock}
                          >
                            <option value="">Selecione o material</option>
                            {camiseta.materials.map((material) => (
                              <option key={material} value={material}>
                                {material}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                            disabled={!camiseta.inStock}
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        <button
                          onClick={() => handleAddToCart(camiseta)}
                          className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                          disabled={!camiseta.inStock}
                        >
                          Adicionar ao Carrinho
                        </button>
                        <button
                          onClick={() => handleWhatsApp(camiseta)}
                          className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800"
                        >
                          {camiseta.inStock ? "Comprar via WhatsApp" : "Encomendar via WhatsApp"}
                        </button>
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
        >
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-xl border-2 border-blue-900/20 shadow-2xl">
            <button
              onClick={() => {
                setSelectedCamiseta(null);
                setSelectedColor("");
                setSelectedSize("");
                setSelectedMaterial("");
                setQuantity(1);
              }}
              className="absolute top-4 right-4 text-blue-900 hover:text-emerald-500"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>
            <div className="p-6 text-blue-900">
              <h3 className="text-xl font-bold mb-3">{selectedCamiseta.name}</h3>
              <img
                src={selectedCamiseta.imageUrl}
                alt={selectedCamiseta.name}
                className="w-full h-64 object-contain rounded-lg mb-3 border border-blue-900/20"
              />
              <p className="text-sm mb-3">{selectedCamiseta.description}</p>
              <p className="font-bold text-lg text-emerald-500 mb-3">
                R$ {(getPricePerUnit(quantity) * quantity).toFixed(2)} ({quantity} un)
              </p>
              <p
                className={`text-sm mb-3 ${
                  selectedCamiseta.inStock ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {selectedCamiseta.inStock ? "Disponível para personalização" : "Não disponível"}
              </p>
              <div className="space-y-3">
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  disabled={!selectedCamiseta.inStock}
                >
                  <option value="">Selecione a cor</option>
                  {selectedCamiseta.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  disabled={!selectedCamiseta.inStock}
                >
                  <option value="">Selecione o tamanho</option>
                  {selectedCamiseta.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  disabled={!selectedCamiseta.inStock}
                >
                  <option value="">Selecione o material</option>
                  {selectedCamiseta.materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  disabled={!selectedCamiseta.inStock}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(selectedCamiseta)}
                  className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  disabled={!selectedCamiseta.inStock}
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => handleWhatsApp(selectedCamiseta)}
                  className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800"
                >
                  {selectedCamiseta.inStock ? "Comprar via WhatsApp" : "Encomendar via WhatsApp"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}