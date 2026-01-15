import { createContext, useContext } from "react";
import { CartContext } from "./CartContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { cart, user, clearCart, syncCartToDB } =
    useContext(CartContext);

  const placeOrder = async () => {
    if (!user) {
      alert("Please login to place order");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const newOrder = {
      id: crypto.randomUUID(),
      userId: user.id,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
      status: "Placed",
      createdAt: new Date().toISOString()
    };

    try {
      // 1️⃣ Save to global orders
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });

      // 2️⃣ Update user orders + empty cart
      const updatedUser = {
        ...user,
        orders: [...(user.orders || []), newOrder],
        cart: []
      };

      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: updatedUser.orders,
          cart: []
        })
      });

      // 3️⃣ Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 4️⃣ Clear cart ONLY LOCALLY
      clearCart(false); // 🔥 pass flag to skip DB sync
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  return (
    <OrderContext.Provider value={{ placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
