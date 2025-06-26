import React from "react";
import { useCart } from "../../../contexts/CartContext";
import CartItemRow from "./CartRow";

interface Props {
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose }) => {
  const { items, total, error, removeItem, clearCart, isCartOpen } = useCart();

  const handleWhatsAppClick = () => {
    if (items.length > 0) {
      const message = `Olá! Quero comprar: ${items
        .map((i) => `${i.name} x${i.quantity}`)
        .join(", ")}. Total: R$${total.toFixed(2)}.`;
      window.open(`https://wa.me/5531999999999?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100">
        <header className="flex items-center justify-between p-6 border-b border-blue-900/10">
          <h2 className="text-2xl font-bold text-blue-900">Meu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-blue-900 hover:text-emerald-500 text-2xl p-2 rounded-full hover:bg-blue-900/5 transition-colors duration-200"
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </header>

        {error && items.length === 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 mx-6 mt-6 rounded-lg">
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <p className="p-6 text-center text-blue-900/70 text-lg font-medium">
            Seu carrinho está vazio.
          </p>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
            <div className="flex items-center justify-between p-6 border-t border-blue-900/10 bg-blue-900/5">
              <span className="font-semibold text-xl text-blue-900">Total:</span>
              <span className="text-emerald-500 font-bold text-2xl">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex gap-4 px-6 pb-6">
              <button
                onClick={clearCart}
                className="flex-1 bg-white border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-900 hover:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={items.length === 0}
                aria-label="Limpar carrinho"
              >
                Limpar Carrinho
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={items.length === 0}
                aria-label="Finalizar compra pelo WhatsApp"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;