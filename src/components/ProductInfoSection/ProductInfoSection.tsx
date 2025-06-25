import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductInfoSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="py-16 px-4 bg-white text-blue-900"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-8 text-emerald-600 drop-shadow-sm"
          data-aos="fade-up"
        >
          Sobre Nossos Produtos e Vendas
        </h2>
        <p
          className="text-lg md:text-xl mb-6 text-blue-700 italic leading-relaxed"
          data-aos="fade-up"
        >
          Trabalhamos com perfumes originais e internacionais, trazendo fragrâncias exclusivas
          diretamente para você. Cada produto é autêntico, garantindo qualidade e sofisticação.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Card 1 */}
          <div className="p-6 rounded-lg shadow-lg border border-emerald-600 bg-white">
            <h3 className="text-2xl font-semibold mb-4 text-emerald-600">
              Meios de Venda
            </h3>
            <p className="text-base text-blue-800">
              Todas as nossas vendas são finalizadas via WhatsApp. Entre em contato para
              consultar disponibilidade e personalizar sua compra.
            </p>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Fale Conosco
            </a>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-lg shadow-lg border border-emerald-600 bg-white">
            <h3 className="text-2xl font-semibold mb-4 text-emerald-600">Entrega</h3>
            <p className="text-base text-blue-800">
              Oferecemos entrega grátis em Betim e região em MG. Para demais locais, o frete é
              calculado no momento da compra. Consulte-nos para mais detalhes!
            </p>
          </div>
        </div>

        <p
          className="text-lg md:text-xl font-bold text-emerald-600"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Compromisso com a excelência em cada fragrância.
        </p>
      </div>
    </section>
  );
};

export default ProductInfoSection;
