import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const getPriceBySize = (basePrice, size) => {
  if (size === "100ml") return basePrice + 100;
  if (size === "150ml") return basePrice + 200;
  return basePrice; // 50ml
};


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCart(parsedUser.cart || []);
    }
  }, []);

  const syncCartToDB = async (updatedCart) => {
    if (!user?.id) return;

    try {
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart })
      });

      const updatedUser = { ...user, cart: updatedCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

//  const addToCart = (product) => {
//   if (!user) return alert("Please login first");

//   const hasOffer = product.offer === true;
//   const finalPrice = hasOffer
//     ? Math.round(product.price * 0.8)
//     : product.price;

//   setCart((prev) => {
//     const existing = prev.find(
//       (i) => i.id === product.id && i.size === product.size
//     );

//     const updatedCart = existing
//       ? prev.map((i) =>
//           i.id === product.id && i.size === product.size
//             ? { ...i, qty: i.qty + (product.qty ?? 1) }
//             : i
//         )
//       : [
//           ...prev,
//           {
//             ...product,
//             price: finalPrice,      
//             qty: product.qty ?? 1,  
//             cartItemId: crypto.randomUUID(),
//           }
//         ];

//     syncCartToDB(updatedCart);
//     return updatedCart;
//   });
// };

const addToCart = (product) => {
  if (!user) return alert("Please login first");

  // 🔹 size based price
  const sizePrice = getPriceBySize(
    product.price,
    product.size
  );

  // 🔹 apply offer after size price
  const finalPrice =
    product.offer === true
      ? Math.round(sizePrice * 0.8)
      : sizePrice;

  setCart((prev) => {
    const existing = prev.find(
      (i) =>
        i.id === product.id &&
        i.size === product.size
    );

    const updatedCart = existing
      ? prev.map((i) =>
          i.id === product.id &&
          i.size === product.size
            ? { ...i, qty: i.qty + (product.qty ?? 1) }
            : i
        )
      : [
          ...prev,
          {
            ...product,
            price: finalPrice,
            qty: product.qty ?? 1,
            cartItemId: crypto.randomUUID(),
          },
        ];

    syncCartToDB(updatedCart);
    return updatedCart;
  });
};


  const logout = () => {
  localStorage.removeItem("user");
  setUser(null);
  setCart([]);
};

  const removeFromCart = (cartItemId) => {
  setCart((prev) => {
    const updated = prev.filter(
      (i) => i.cartItemId !== cartItemId
    );
    syncCartToDB(updated);
    return updated;
  });
};

  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, qty } : i
      );
      syncCartToDB(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    syncCartToDB([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice,
        user,
        logout      
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
