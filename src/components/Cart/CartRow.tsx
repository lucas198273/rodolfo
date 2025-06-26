import React from "react";
import type { CartItem } from "../../../contexts/CartContext";
import { useCart } from "../../../contexts/CartContext";

interface Props {
  item: CartItem;
  onRemove: (id: string) => void;
}

const CartItemRow: React.FC<Props> = ({ item, onRemove }) => {
  const { incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr,auto] gap-6 items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-blue-900/10">
      <img
        src={item.imageUrl}
        alt={`Imagem de ${item.name}`}
        className="w-24 h-24 object-cover rounded-lg shadow-sm border border-blue-900/20"
        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
      />
      <div className="space-y-3">
        <p className="font-semibold text-blue-900 text-xl">{item.name}</p>
        <p className="text-emerald-500 font-bold text-2xl">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-900/5 rounded-lg p-1">
            <button
              onClick={() => decrementQuantity(item.id)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-blue-900/50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={item.quantity <= 1}
              aria-label={`Diminuir quantidade de ${item.name}`}
            >
              -
            </button>
            <span className="text-lg font-medium text-blue-900 w-12 text-center">{item.quantity}</span>
            <button
              onClick={() => incrementQuantity(item.id)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
              aria-label={`Aumentar quantidade de ${item.name}`}
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="px-4 py-2 bg-white text-blue-900 border border-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-colors duration-200"
            aria-label={`Remover ${item.name} do carrinho`}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;