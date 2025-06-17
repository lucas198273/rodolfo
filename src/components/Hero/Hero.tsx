import { useState } from 'react';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    perfume: '',
    dataEntrega: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de fazer um pedido de perfume.\n\nNome: ${form.nome}\nPerfume desejado: ${form.perfume}\nData preferida para entrega: ${form.dataEntrega}`;
    const whatsappLink = `https://wa.me/5531983703055?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setIsOpen(false);
  };

  return (
    <section className="relative bg-[#0a0a1a] text-[#d4af37] py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Texto */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#d4af37]">
            Bem-vindo ao <br />
            <span className="text-[#c8a44c]">Império Dos Aromas</span>
          </h1>
          <p className="text-lg text-[#f2e6c9] mb-6 max-w-md">
            Perfumes com essência de realeza. Encontre o aroma perfeito que combina com sua alma.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-block px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#c8a44c] transition text-[#0a0a1a] font-semibold"
          >
            Faça seu Pedido
          </button>
        </div>

        {/* Imagem */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* Fundo dourado suave */}
          <div className="absolute w-72 h-72 bg-[#d4af37]/20 blur-2xl rounded-full -top-10 -left-10 z-0"></div>

          {/* Imagem do perfume */}
          <img
            src="/assets/img1.jpeg"
            alt="Frasco de perfume elegante"
            className="w-full max-w-sm z-10 relative"
          />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              aria-label="Fechar"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4 text-[#0a0a1a]">Faça seu Pedido</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                maxLength={50}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
              <input
                type="text"
                name="perfume"
                value={form.perfume}
                onChange={handleChange}
                placeholder="Nome do perfume desejado"
                required
                maxLength={50}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
              <input
                type="date"
                name="dataEntrega"
                value={form.dataEntrega}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />

              <button
                type="submit"
                className="w-full bg-[#d4af37] text-[#0a0a1a] py-2 rounded-lg hover:bg-[#c8a44c] transition"
              >
                Enviar para WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
