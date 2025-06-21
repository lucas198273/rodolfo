import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "../../../contexts/CartContext";
import { toast } from "react-toastify"; // Importar toast

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
  name: "Brand Collection Sauvage",
  price: 199.9,
  imageUrl: "/assets/masculinos/100-1.webp",
  description: "Inspirado no Sauvage da Dior, o Brand Collection 100 é um perfume masculino oriental fougère que transmite uma aura selvagem, moderna e aventureira.",
  notes: [
    "Bergamota",
    "Pimenta",
    "Lavanda",
    "Vetiver",
    "Patchouli",
    "Gerânio",
    "Elemi",
    "Ambroxan",
    "Cedro",
    "Ládano"
  ],
  available: true,
},
{
  id: "p2",
  name: "Arabic Collection Yara ",
  price: 189.9,
  imageUrl: "/assets/masculinos/002-1.webp",
  description: "Inspirado no perfume Yara, o Arabic Collection A002 é uma fragrância feminina que une tradição e modernidade, com uma combinação envolvente e marcante.",
  notes: [
    "Orquídea",
    "Heliotrópio",
    "Tangerina"
  ],
  available: true,
},

{
  id: "p3",
  name: "Brand Collection 212 Vip Men ",
  price: 199.9,
  imageUrl: "/assets/masculinos/008-2.webp",
  description: "Inspirado no 212 Vip Men de Carolina Herrera, o Brand Collection 008 é um perfume âmbar amadeirado com um frescor sofisticado que combina menta e vodka em uma explosão de aromas masculinos marcantes.",
  notes: [
    "Menta",
    "Vodka",
    "Gengibre",
    "Âmbar",
    "Notas Amadeiradas"
  ],
  available: true,
}
,
{
  id: "p4",
  name: "Arabic Collection  Amber Rouge (Orientica) ",
  price: 79.9,
  imageUrl: "/assets/masculinos/026.webp",
  description: "Inspirado no Amber Rouge (Orientica) e reconhecido como o “irmão gêmeo” do Baccarat Rouge 540, o Arabic Collection A026 é uma fragrância unissex âmbar-amadeirada especiada, ideal para quem busca sofisticação marcante.",
  notes: [
    "Açafrão",
    "Jasmim",
    "Madeira de Âmbar",
    "Âmbar Cinzento",
    "Cedro",
    "Resina de Abeto"
  ],
  available: true,
}
,
   {
  id: "p5",
  name: "Brand Collection Bleu de Chanel",
  price: 209.9,
  imageUrl: "/assets/masculinos/070-1.webp",
  description: "Inspirado no icônico Bleu de Chanel, o Brand Collection 070 é um perfume masculino aromático-amadeirado atemporal, com frescor revigorante e rastro sofisticado em frasco azul profundo.",
  notes: [
    "Toranja (grapefruit)",
    "Limão",
    "Hortelã (menta)",
    "Pimenta rosa",
    "Gengibre",
    "Noz‑moscada",
    "Jasmim",
    "Iso E Super",
    "Incenso",
    "Vetiver",
    "Cedro",
    "Sândalo",
    "Patchouli",
    "Ládano",
    "Almíscar branco"
  ],
  available: true,
},
  {
  id: "p6",
  name: "Brand Collection   Olympéa 087",
  price: 209.9,
  imageUrl: "/assets/masculinos/087-2.webp",
  description: "Inspirado no icônico Olympéa de Paco Rabanne, o Brand Collection 087 é uma fragrância feminina oriental floral com contraste marcante entre o frescor salgado e a doçura cremosa da baunilha, evocando a força de uma deusa moderna.",
  notes: [
    "Jasmim aquático",
    "Tangerina verde",
    "Flor de gengibre",
    "Baunilha salgada",
    "Sal",
    "Âmbar cinzento",
    "Madeira de caxemira",
    "Sândalo"
  ],
  available: true,
}
,{
  id: "p7",
  name: "Brand Collection  Scandal 136",
  price: 209.9,
  imageUrl: "/assets/masculinos/136-1.webp",
  description: "Inspirado no icônico Scandal de Jean Paul Gaultier, o Brand Collection 136 é uma fragrância feminina chypre gourmand poderosa, criada para causar impacto e empoderar. Uma verdadeira ‘revolução olfativa’ para uma mulher moderna e audaciosa.",
  notes: [
    "Laranja sanguínea",
    "Mandarina",
    "Mel",
    "Gardênia",
    "Flor de laranjeira",
    "Jasmim",
    "Pêssego",
    "Cera de abelha",
    "Caramelo",
    "Patchouli",
    "Alcaçuz"
  ],
  available: true,
}
,
   {
  id: "p8",
  name: "Brand Collection 212 VIP Black",
  price: 199.9,
  imageUrl: "/assets/masculinos/154-1.webp",
  description: "Inspirado no icônico 212 VIP Black de Carolina Herrera, o Brand Collection 154 é uma fragrância masculina aromático-fougère intensa, ideal para noites vibrantes e homens confiantes que vivem a noite como se fosse um shot de absinto.",
  notes: [
    "Absinto",
    "Anis",
    "Erva‑doce",
    "Lavanda",
    "Baunilha negra",
    "Almíscar"
  ],
  available: true,
}
,
   {
  id: "p9",
  name: "Brand Collection Gaultier Divine",
  price: 219.9,
  imageUrl: "/assets/masculinos/205-1.webp",
  description: "Inspirado no Gaultier Divine de Jean Paul Gaultier, o Brand Collection 205 é uma fragrância feminina floral gourmand marinha que celebra a deusa moderna, com notas que evocam uma combinação de flores brancas cremadas e sal marinho.",
  notes: [
    "Merengue",
    "Sal",
    "Lírio",
    "Jasmim",
    "Ylang‑ylang",
    "Patchouli",
    "Almíscar"
  ],
  available: true,
}
,
  {
  id: "p10",
  name: "Brand Collection 387",
  price: 86.9,
  imageUrl: "/assets/masculinos/387-1.webp",
  description: "Inspirado no The Most Wanted (Azzaro), o Brand Collection 387 é uma fragrância masculina fougère âmbar amadeirada, criada para homens que se jogam e vivem com coragem, exalando poder e sedução.",
  notes: [
    "Cardamomo",
    "Toffee",
    "Madeira de âmbar"
  ],
  available: true,
}
,
  ];

  const handleWhatsApp = (perfume: Perfume) => {
    const message = encodeURIComponent(
      `Olá! Quero comprar os seguintes perfumes: ${items
        .map((item) => `${item.name} (R$${item.price.toFixed(2)} x ${item.quantity})`)
        .join(", ")}. Total: R$${items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)}. Interesse especial no "${perfume.name}" por R$${perfume.price.toFixed(2)}.`
    );
    const whatsappLink = `https://wa.me/5531999999999?text=${message}`;
    window.open(whatsappLink, "_blank");
    toast.info(`Mensagem enviada para o WhatsApp sobre ${perfume.name}!`, {
      position: "top-right",
      autoClose: 3000,
      className: "bg-blue-600 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
    });
    return whatsappLink;
  };

  const handleAddToCart = (perfume: Perfume) => {
    if (perfume.available) {
      addItem({
        id: perfume.id,
        name: perfume.name,
        price: perfume.price,
        imageUrl: perfume.imageUrl,
      });
      toast.success(`${perfume.name} adicionado ao carrinho!`, {
        position: "top-right",
        autoClose: 3000,
        className: "bg-green-600 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
      });
    } else {
      toast.error("Este perfume não está disponível no estoque!", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-red-500 text-white p-4 rounded-lg shadow-lg text-sm font-medium",
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-white text-blue-900" data-aos="fade-in">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-lg text-blue-900">
          Catálogo de Perfumes
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {perfumes.map((perfume, index) => (
            <div
              key={perfume.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col relative transition-transform hover:scale-[1.03] border-2 border-blue-900 h-[300px] sm:h-[350px] md:h-[400px] min-w-[180px] max-w-xs"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={perfume.imageUrl}
                  alt={perfume.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full shadow-md ${
                    perfume.available ? "bg-green-600" : "bg-gray-400"
                  } text-white`}
                >
                  {perfume.available ? "Disponível" : "Indisponível"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              <div className="p-3 sm:p-4 text-center flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold mb-1 truncate text-blue-900">
                    {perfume.name}
                  </h3>
                  <p className="text-sm sm:text-base font-bold mb-2 text-blue-900">
                    R$ {perfume.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setSelectedPerfume(perfume)}
                    className="w-full px-3 py-1.5 rounded-lg text-white font-semibold transition-colors bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                    disabled={!perfume.available}
                    aria-label={`Ver mais sobre ${perfume.name}`}
                  >
                    Ver Mais
                  </button>
                  <button
                    onClick={() => handleAddToCart(perfume)}
                    className="w-full px-3 py-1.5 rounded-lg text-white font-semibold transition-colors bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                    disabled={!perfume.available}
                  >
                    Adicionar ao Carrinho
                  </button>
                  {!perfume.available && (
                    <button
                      onClick={() => window.open(handleWhatsApp(perfume), "_blank")}
                      className="w-full px-3 py-1.5 rounded-lg text-white font-semibold text-sm sm:text-base text-center bg-green-700 hover:bg-yellow-300"
                    >
                      Encomendar via WhatsApp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPerfume && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4"
            data-aos="zoom-in"
            role="dialog"
          >
            <div className="bg-white rounded-2xl max-w-sm sm:max-w-md md:max-w-lg w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto shadow-lg border-2 border-blue-900">
              <button
                onClick={() => setSelectedPerfume(null)}
                className="absolute top-2 right-2 text-blue-900 hover:text-blue-700"
                aria-label="Fechar modal"
              >
                <svg
                  className="w-5 h-5"
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

              <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-900">
                {selectedPerfume.name}
              </h3>
              <img
                src={selectedPerfume.imageUrl}
                alt={selectedPerfume.name}
                className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-lg mb-2"
              />
              <p className="text-sm sm:text-base mb-2 text-blue-900">
                {selectedPerfume.description}
              </p>

              <div className="mb-2">
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-blue-900">
                  Notas Olfativas
                </h4>
                <ul className="list-disc list-inside text-sm sm:text-base text-blue-900">
                  {selectedPerfume.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-base sm:text-lg mb-2 text-blue-900">
                R$ {selectedPerfume.price.toFixed(2)}
              </p>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleAddToCart(selectedPerfume)}
                  className="w-full px-3 py-2 text-white rounded-lg text-center transition-colors bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                  disabled={!selectedPerfume.available}
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => window.open(handleWhatsApp(selectedPerfume), "_blank")}
                  className="w-full px-3 py-2 text-white rounded-lg text-center transition-colors bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
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