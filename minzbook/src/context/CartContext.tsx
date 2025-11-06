import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  add: (b: { id: string; title: string; price: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  total: number;
  count: number; // total de items en el carrito
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

const LS_KEY = "mb_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const add: CartContextType["add"] = (b) => {
    setItems((prev) => {
      const ex = prev.find((x) => x.id === b.id);
      if (ex) {
        return prev.map((x) =>
          x.id === b.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...b, qty: 1 }];
    });
  };

  const setQty: CartContextType["setQty"] = (id, qty) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
    );
  };

  const remove: CartContextType["remove"] = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const total = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, add, setQty, remove, total, count }),
    [items, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
