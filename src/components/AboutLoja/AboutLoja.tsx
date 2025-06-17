import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutLoja() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="min-h-screen pt-32 pb-16 px-4"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #0a0a1a)",
        color: "#0a0a1a",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Imagem do perfume */}
        <div className="w-full lg:w-1/2 flex justify-center" data-aos="fade-right">
          <img
            src="/assets/fly.png"
            alt="Lattafa Lail Maleki"
            className="rounded-xl shadow-xl w-full max-w-sm h-auto object-contain border-4 border-blue-600"
          />
        </div>

        {/* Texto sobre o perfume */}
        <div className="w-full lg:w-1/2" data-aos="fade-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "#0a0a1a" }}>
            Lattafa{" "}
            <span
              className="font-semibold"
              style={{ color: "#3b82f6" /* azul claro para destaque */ }}
            >
              Lail Maleki
            </span>
          </h2>

          <p className="text-lg sm:text-xl mb-6" style={{ color: "#0a0a1a" }}>
            Uma fragrância oriental <strong>unissex</strong> que combina frescor de frutas e cítricos no topo com um coração floral luxuoso — mel, jasmim, gardênia e orquídea — e um fundo quente de âmbar, sândalo, musk e caramelo.
          </p>

          <ul className="list-disc pl-6 text-lg sm:text-xl space-y-2 mb-6" style={{ color: "#0a0a1a" }}>
            <li>
              <strong style={{ color: "#3b82f6" }}>Topo:</strong> Frutas, especiarias, cítricos
            </li>
            <li>
              <strong style={{ color: "#3b82f6" }}>Coração:</strong> Mel, jasmim, gardênia, orquídea
            </li>
            <li>
              <strong style={{ color: "#3b82f6" }}>Fundo:</strong> Âmbar, musk, caramelo, sândalo
            </li>
          </ul>

          <p className="text-lg sm:text-xl" style={{ color: "#0a0a1a" }}>
            Ideal para quem busca uma assinatura olfativa marcante: fresco ao primeiro spray, floral no corpo e sofisticado até o final.
          </p>
        </div>
      </div>
    </section>
  );
}
