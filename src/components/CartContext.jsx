import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ➕ Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // 🧮 Total items count
  const cartCount = cartItems.length;

  // 💰 Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  // ❌ Remove item from cart (by index)
        const removeFromCart = (indexToRemove) => {
        setCartItems((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
        };

    const clearCart = () => {
    setCartItems([]);
    };


  return (
    <CartContext.Provider


      value={{
        cartItems,
        addToCart,
        removeFromCart, 
        clearCart, 
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export const useCart = () => useContext(CartContext);
