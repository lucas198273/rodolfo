
export default function Hero() {
  const handleSubmit = () => {
    const message = `Olá! Gostaria de fazer um pedido de camiseta.`;
    const whatsappLink = `https://wa.me/5531983703055?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <section className="relative bg-blue-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Texto à esquerda */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Bem-vindo ao <br />
            <span className="text-emerald-400">Império das Camisetas</span>
          </h1>
          <p className="text-lg text-blue-200 mb-6 max-w-md">
            Camisetas estampadas com elegância e qualidade. Escolha sua estampa e peça agora mesmo!
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <button
              type="submit"
              className="inline-block px-6 py-3 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors text-blue-900 font-semibold"
            >
              Faça seu Pedido
            </button>
          </form>
        </div>

        {/* Imagens à direita */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute w-100 h-100 bg-[#00ced1]/20 blur-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
          <div className="flex items-center justify-center gap-4 md:gap-6 z-10 relative">
         
            <img
              src="/assets/image.png" // Substitua pelo caminho real da imagem
              alt="Camiseta 2"
              className="w-100 md:w- drop-shadow-[0_0_15px_rgba(0,206,209,0.7)] transition-transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}