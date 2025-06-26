import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useCart} from "../../../contexts/CartContext";
import { toast } from "react-toastify";

interface Camiseta {
  id: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  description: string;
  available: boolean;
  colors: string[];
  sizes: string[];
  materials: string[];
}

const camisetas = [
  {
    id: "c1",
    name: "Camiseta Estampada Azul",
    basePrice: 75,
    imageUrl: "/assets/camiseta1.png",
    description: "Camiseta com estampa moderna, ideal para o dia a dia.",
    available: true,
    colors: ["Azul", "Branco", "Preto"],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Algodão", "Poliéster", "Mistura"],
  },
  {
    id: "c2",
    name: "Camiseta Estampada Verde",
    basePrice: 75,
    imageUrl: "/assets/camiseta2.png",
    description: "Camiseta com estampa vibrante, perfeita para eventos casuais.",
    available: true,
    colors: ["Verde", "Cinza", "Vermelho"],
    sizes: ["P", "M", "G", "GG"],
    materials: ["Algodão", "Poliéster"],
  },
  {
    id: "c3",
    name: "Camiseta Estampada Preta",
    basePrice: 75,
    imageUrl: "/assets/camiseta3.png",
    description: "Camiseta com estampa elegante, ideal para noites especiais.",
    available: false,
    colors: ["Preto", "Branco"],
    sizes: ["M", "G", "GG"],
    materials: ["Algodão"],
  },
  {
    id: "c4",
    name: "Camiseta Estampada Cinza",
    basePrice: 75,
    imageUrl: "/assets/camiseta4.png",
    description: "Camiseta com estampa minimalista, versátil para qualquer ocasião.",
    available: true,
    colors: ["Cinza", "Azul", "Branco"],
    sizes: ["P", "M", "G"],
    materials: ["Algodão", "Mistura"],
  },
];

const ProductCatalog: React.FC = () => {
  const { addItem } = useCart();
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [selectedMaterials, setSelectedMaterials] = useState<{ [key: string]: string }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const getPricePerUnit = (quantity: number) => {
    if (quantity >= 50) return 45;
    if (quantity >= 15) return 50;
    if (quantity >= 5) return 60;
    return 75;
  };

  const handleWhatsApp = (camiseta: Camiseta) => {
    const color = selectedColors[camiseta.id] || "não especificado";
    const size = selectedSizes[camiseta.id] || "não especificado";
    const material = selectedMaterials[camiseta.id] || "não especificado";
    const quantity = quantities[camiseta.id] || 1;
    const pricePerUnit = getPricePerUnit(quantity);
    const totalPrice = pricePerUnit * quantity;
    const mensagem = encodeURIComponent(
      `Olá! Quero comprar: ${camiseta.name} x${quantity} (Cor: ${color}, Tamanho: ${size}, Material: ${material}). Total: R$${totalPrice.toFixed(2)}.`
    );
    const whatsappLink = `https://wa.me/5531999999999?text=${mensagem}`;
    window.open(whatsappLink, "_blank");
    toast.info(`Mensagem enviada para o WhatsApp sobre ${camiseta.name}!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleAddToCart = (camiseta: Camiseta) => {
    const color = selectedColors[camiseta.id];
    const size = selectedSizes[camiseta.id];
    const material = selectedMaterials[camiseta.id];
    const quantity = quantities[camiseta.id] || 1;

    if (!color || !size || !material) {
      toast.error("Por favor, selecione cor, tamanho e material!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (camiseta.available) {
      const pricePerUnit = getPricePerUnit(quantity);
      addItem({
        id: `${camiseta.id}-${color}-${size}-${material}`,
        name: `${camiseta.name} (${color}, ${size}, ${material})`,
        price: pricePerUnit,
        imageUrl: camiseta.imageUrl,
        quantity: quantity,
        color: color,
        size: size,
        material: material,
      });
      toast.success(`${camiseta.name} adicionado ao carrinho!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Esta camiseta não está disponível no estoque!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-white text-blue-900" data-aos="fade-in">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Catálogo de Camisetas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {camisetas.map((camiseta, index) => (
            <div
              key={camiseta.id}
              className="group bg-white/95 rounded-2xl overflow-hidden shadow-lg flex flex-col relative border-2 border-blue-900 h-[450px] sm:h-[500px] md:h-[520px]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={camiseta.imageUrl}
                  alt={camiseta.name}
                  className="w-full h-full object-contain"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    camiseta.available ? "bg-green-600" : "bg-gray-400"
                  } text-white`}
                >
                  {camiseta.available ? "Disponível" : "Indisponível"}
                </span>
              </div>

              <div className="p-3 text-center flex flex-col flex-grow">
                <h3 className="text-sm font-semibold mb-1 truncate">
                  {camiseta.name}
                </h3>
                <p className="text-sm font-bold mb-2">
                  A partir de R$ {getPricePerUnit(1).toFixed(2)}
                </p>

                <div className="space-y-2 flex-grow">
                  <select
                    value={selectedColors[camiseta.id] || ""}
                    onChange={(e) =>
                      setSelectedColors((prev) => ({
                        ...prev,
                        [camiseta.id]: e.target.value,
                      }))
                    }
                    className="w-full p-1.5 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    disabled={!camiseta.available}
                  >
                    <option value="">Selecione a cor</option>
                    {camiseta.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedSizes[camiseta.id] || ""}
                    onChange={(e) =>
                      setSelectedSizes((prev) => ({
                        ...prev,
                        [camiseta.id]: e.target.value,
                      }))
                    }
                    className="w-full p-1.5 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    disabled={!camiseta.available}
                  >
                    <option value="">Selecione o tamanho</option>
                    {camiseta.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedMaterials[camiseta.id] || ""}
                    onChange={(e) =>
                      setSelectedMaterials((prev) => ({
                        ...prev,
                        [camiseta.id]: e.target.value,
                      }))
                    }
                    className="w-full p-1.5 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    disabled={!camiseta.available}
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
                    value={quantities[camiseta.id] || 1}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [camiseta.id]: Math.max(1, parseInt(e.target.value) || 1),
                      }))
                    }
                    className="w-full p-1.5 text-sm border border-blue-900/20 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    disabled={!camiseta.available}
                  />
                </div>

                <div className="flex flex-col gap-1 mt-auto">
                  <Link to={`/product/${camiseta.id}`}>
                    <button
                      className="w-full px-3 py-1.5 rounded-lg text-white font-semibold bg-blue-700 hover:bg-blue-800"
                    >
                      Ver Mais
                    </button>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(camiseta)}
                    className="w-full px-3 py-1.5 rounded-lg text-white font-semibold bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!camiseta.available}
                  >
                    Adicionar ao Carrinho
                  </button>

                  <button
                    onClick={() => handleWhatsApp(camiseta)}
                    className={`w-full px-3 py-1.5 rounded-lg font-semibold ${
                      camiseta.available
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "bg-green-700 text-blue-900 hover:bg-blue-300"
                    }`}
                  >
                    {camiseta.available
                      ? "Pedir pelo WhatsApp"
                      : "Encomendar pelo WhatsApp"}
                  </button>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;