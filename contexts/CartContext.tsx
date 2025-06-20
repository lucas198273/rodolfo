
import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import DOMPurify from "dompurify";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  total: number;
  error: string | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sanitizeInput = (input: string) => DOMPurify.sanitize(input);

  const validateItem = (item: Omit<CartItem, "quantity">) => {
    if (!item.id || typeof item.id !== "string") return "ID inválido";
    if (!item.name || typeof item.name !== "string") return "Nome inválido";
    if (typeof item.price !== "number" || item.price < 0) return "Preço inválido";
    if (!item.imageUrl) return "URL de imagem não fornecida";
    return null;
  };

  const addItem = (item: Omit<CartItem, "quantity">) => {
    const validationError = validateItem(item);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    const sanitizedItem = {
      ...item,
      name: sanitizeInput(item.name),
      imageUrl: sanitizeInput(item.imageUrl),
    };
    setItems((prev) => {
      const exists = prev.find((i) => i.id === sanitizedItem.id);
      if (exists) {
        return prev.map((i) =>
          i.id === sanitizedItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...sanitizedItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    if (!id) {
      setError("ID do item não pode ser vazio");
      return;
    }
    setError(null);
    setItems((prev) => {
      const newItems = prev.filter((i) => i.id !== id);
      console.log("Items após remoção:", newItems);
      return [...newItems];
    });
  };

  const incrementQuantity = (id: string) => {
    if (!id) {
      setError("ID do item não pode ser vazio");
      return;
    }
    setError(null);
    setItems((prev) => {
      const newItems = prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      );
      console.log("Items após incremento:", newItems);
      return [...newItems];
    });
  };

  const decrementQuantity = (id: string) => {
    if (!id) {
      setError("ID do item não pode ser vazio");
      return;
    }
    setError(null);
    setItems((prev) => {
      const newItems = prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      );
      console.log("Items após decremento:", newItems);
      return [...newItems];
    });
  };

  const clearCart = () => {
    setItems([]);
    setError(null);
  };

  const total = useMemo(() => {
    console.log("Recalculando total com items:", items);
    const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("Novo total calculado:", newTotal);
    return newTotal;
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        error,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};