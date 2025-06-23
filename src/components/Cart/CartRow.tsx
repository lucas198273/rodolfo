// CartItemRow.tsx
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
    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr,auto] gap-4 items-center p-6 border-b hover:bg-gray-50 transition-colors">
      <img
        src={item.imageUrl}
        alt={`Imagem de ${item.name}`}
        className="w-20 h-20 object-cover rounded-lg shadow-md"
        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
      />
      <div className="space-y-2">
        <p className="font-semibold text-blue-900 text-lg">{item.name}</p>
        <p className="text-yellow-600 font-bold text-xl">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => decrementQuantity(item.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 transition-colors"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-medium">{item.quantity}</span>
          <button
            onClick={() => incrementQuantity(item.id)}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            +
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-4 px-4 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            Remover do Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;