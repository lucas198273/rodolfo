import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  onClose: () => void; // Nova prop para fechar o modal
}

const Cart: React.FC<CartProps> = ({ items, removeItem, updateQuantity, clearCart, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" role="dialog">
      <div className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-lg border-2 border-blue-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900">Meu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-blue-900 hover:text-blue-700"
            aria-label="Fechar carrinho"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900">{item.name}</p>
                    <p className="text-yellow-600 font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <label className="text-sm text-blue-900">Qtd:</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, Number(e.target.value))}
                        className="w-16 border rounded px-2 py-1 text-center text-blue-900"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-lg text-blue-900">Total:</p>
              <p className="font-bold text-xl text-green-700">R$ {total.toFixed(2)}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
              >
                Limpar Carrinho
              </button>
              <a
                href={`https://wa.me/5531999999999?text=${encodeURIComponent(
                  `Olá! Quero comprar os seguintes perfumes: ${items
                    .map(item => `${item.name} (R$${item.price.toFixed(2)} x ${item.quantity})`)
                    .join(", ")}. Total: R$${total.toFixed(2)}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 text-center"
              >
                Finalizar Compra
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;