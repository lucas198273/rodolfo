
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
    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr,auto] gap-4 items-center p-4 border-b hover:bg-gray-50">
      <img
        src={item.imageUrl}
        alt={`Imagem de ${item.name}`}
        className="w-16 h-16 object-cover rounded"
        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
      />
      <div className="space-y-2">
        <p className="font-semibold text-blue-900">{item.name}</p>
        <p className="text-yellow-600 font-bold">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => decrementQuantity(item.id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={item.quantity <= 1}
          >
            Remover
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            onClick={() => incrementQuantity(item.id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Adicionar
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-600 hover:text-red-800 focus:outline-none rounded"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItemRow;