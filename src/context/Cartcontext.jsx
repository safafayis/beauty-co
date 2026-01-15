// import { createContext, useState } from "react";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   // 1️⃣ CART STATE
//   const [cart, setCart] = useState([]);

//   // 2️⃣ ADD TO CART
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find(
//         (item) => item.id === product.id
//       );

//       if (existing) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       }

//       return [...prevCart, { ...product, qty: 1 }];
//     });
//   };

//   // 3️⃣ REMOVE FROM CART
//   const removeFromCart = (id) => {
//     setCart((prevCart) =>
//       prevCart.filter((item) => item.id !== id)
//     );
//   };

//   // 4️⃣ UPDATE QUANTITY
//   const updateQty = (id, qty) => {
//     if (qty < 1) return;

//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, qty } : item
//       )
//     );
//   };

//   // 5️⃣ CLEAR CART (OPTIONAL)
//   const clearCart = () => {
//     setCart([]);
//   };

//   // 6️⃣ TOTAL PRICE (OPTIONAL)
//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQty,
//         clearCart,
//         totalPrice
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load user from localStorage
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

      // keep localStorage in sync
      const updatedUser = { ...user, cart: updatedCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

 const addToCart = (product) => {
  if (!user) return alert("Please login first");

  // ✅ CENTRALIZED OFFER LOGIC
  const hasOffer = product.offer === true;
  const finalPrice = hasOffer
    ? Math.round(product.price * 0.8)
    : product.price;

  setCart((prev) => {
    const existing = prev.find(
      (i) => i.id === product.id && i.size === product.size
    );

    const updatedCart = existing
      ? prev.map((i) =>
          i.id === product.id && i.size === product.size
            ? { ...i, qty: i.qty + (product.qty ?? 1) }
            : i
        )
      : [
          ...prev,
          {
            ...product,
            price: finalPrice,      // ✅ ALWAYS correct
            qty: product.qty ?? 1,  // ✅ respects qty from details page
            cartItemId: crypto.randomUUID(),
          }
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
