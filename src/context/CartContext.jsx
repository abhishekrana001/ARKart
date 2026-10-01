import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("arkart_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState(() => {
    try {
      return localStorage.getItem("arkart_coupon") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("arkart_cart", JSON.stringify(cart));
    } catch {
      // LocalStorage error handling
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (couponCode) {
        localStorage.setItem("arkart_coupon", couponCode);
      } else {
        localStorage.removeItem("arkart_coupon");
      }
    } catch {
      // ignore
    }
  }, [couponCode]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
  };

  const rawSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const appliedDiscount =
    couponCode.toUpperCase() === "ARKART15"
      ? Math.round(rawSubtotal * 0.15)
      : 0;

  const finalTotal = Math.max(0, rawSubtotal - appliedDiscount);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "ARKART15") {
      setCouponCode("ARKART15");
      return { success: true, message: "Coupon ARKART15 applied! 15% discount activated." };
    }
    return { success: false, message: "Invalid promo code. Try 'ARKART15'" };
  };

  const removeCoupon = () => {
    setCouponCode("");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        couponCode,
        appliedDiscount,
        rawSubtotal,
        finalTotal,
        totalItemCount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}