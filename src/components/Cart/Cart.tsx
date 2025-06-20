
import React, { useEffect } from "react";
import { useCart } from "../../../contexts/CartContext";
import CartItemRow from "../Cart/CartRow";

interface Props {
  onClose: () => void;
}

const Cart: React.FC<Props> = ({ onClose }) => {
  const { items, total, error, removeItem, clearCart } = useCart();
  console.log("Renderizando Cart, total:", total, "items:", items);

  useEffect(() => {
    console.log("useEffect disparado, total:", total);
  }, [total]); // Dispara quando total muda

  const handleWhatsAppClick = () => {
    if (items.length > 0) {
      const message = `Olá! Quero comprar: ${items
        .map((i) => `${i.name} x${i.quantity}`)
        .join(", ")}. Total: R$${total.toFixed(2)}.`;
      window.open(`https://wa.me/5531999999999?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Meu Carrinho</h2>
          <button onClick={onClose} className="text-blue-600 hover:text-red-800">
            ✕
          </button>
        </header>

        {error && items.length === 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mx-4 mt-4 rounded">
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <p className="p-6 text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="p-4">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
            <div className="flex items-center justify-between p-4 border-t">
              <span className="font-semibold">Total:</span>
              <span className="text-green-600 font-bold">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex gap-3 px-4 pb-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={items.length === 0}
              >
                Limpar Carrinho
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={items.length === 0}
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