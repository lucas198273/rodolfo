import { createContext, useContext, useReducer, type ReactNode } from "react";
import DOMPurify from "dompurify";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  error: string | null;
  isCartOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "INCREMENT_QUANTITY"; id: string }
  | { type: "DECREMENT_QUANTITY"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "TOGGLE_CART"; isOpen: boolean };

interface CartContextData {
  items: CartItem[];
  total: number;
  error: string | null;
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  toggleCart: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  console.log("Redutor acionado:", action.type, "Estado atual:", state); // Log para depuração
  switch (action.type) {
    case "ADD_ITEM": {
      const validationError = validateItem(action.item);
      if (validationError) return { ...state, error: validationError };
      const sanitizedItem = {
        ...action.item,
        name: DOMPurify.sanitize(action.item.name),
        imageUrl: DOMPurify.sanitize(action.item.imageUrl),
      };
      const exists = state.items.find((i) => i.id === sanitizedItem.id);
      const newItems = exists
        ? state.items.map((i) =>
            i.id === sanitizedItem.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...sanitizedItem, quantity: 1 }];
      return { ...state, items: newItems, error: null, total: calculateTotal(newItems) };
    }
    case "REMOVE_ITEM": {
      if (!action.id) return { ...state, error: "ID do item não pode ser vazio" };
      const newItems = state.items.filter((i) => i.id !== action.id);
      return { ...state, items: newItems, error: null, total: calculateTotal(newItems) };
    }
    case "INCREMENT_QUANTITY": {
      if (!action.id) return { ...state, error: "ID do item não pode ser vazio" };
      const newItems = state.items.map((i) =>
        i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      return { ...state, items: newItems, error: null, total: calculateTotal(newItems) };
    }
    case "DECREMENT_QUANTITY": {
      if (!action.id) return { ...state, error: "ID do item não pode ser vazio" };
      const newItems = state.items.map((i) =>
        i.id === action.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      );
      return { ...state, items: newItems, error: null, total: calculateTotal(newItems) };
    }
    case "CLEAR_CART": {
      return { items: [], total: 0, error: null, isCartOpen: state.isCartOpen };
    }
    case "SET_ERROR": {
      return { ...state, error: action.error };
    }
    case "TOGGLE_CART": {
      return { ...state, isCartOpen: action.isOpen };
    }
    default:
      return state;
  }
};

const validateItem = (item: Omit<CartItem, "quantity">) => {
  if (!item.id || typeof item.id !== "string") return "ID inválido";
  if (!item.name || typeof item.name !== "string") return "Nome inválido";
  if (typeof item.price !== "number" || item.price < 0) return "Preço inválido";
  if (!item.imageUrl) return "URL de imagem não fornecida";
  return null;
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, error: null, isCartOpen: false });

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const incrementQuantity = (id: string) => {
    dispatch({ type: "INCREMENT_QUANTITY", id });
  };

  const decrementQuantity = (id: string) => {
    dispatch({ type: "DECREMENT_QUANTITY", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = (isOpen: boolean) => {
    dispatch({ type: "TOGGLE_CART", isOpen });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        error: state.error,
        isCartOpen: state.isCartOpen,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        toggleCart,
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