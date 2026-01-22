// import { createContext, useContext } from "react";
// import { CartContext } from "./CartContext";

// export const OrderContext = createContext();

// export function OrderProvider({ children }) {
//   const { cart, user, clearCart, syncCartToDB } =
//     useContext(CartContext);

//  const placeOrder = async () => {
//   if (!user) {
//     alert("Please login to place order");
//     return;
//   }

//   if (cart.length === 0) {
//     alert("Cart is empty");
//     return;
//   }

//  const newOrder = {
//   userId: String(user.id),
//   items: cart,
//   total: cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   ),
//   status: "Placed",
//   createdAt: new Date().toISOString()
// };

//   try {
//     // 1️⃣ Save order
//     const res=await fetch("http://localhost:3000/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newOrder)
//     });
//     if (!res.ok) {
//   throw new Error("Order POST failed");
// }

//     // 2️⃣ Clear cart only
//     await fetch(`http://localhost:3000/users/${user.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cart: [] })
//     });

//     // 3️⃣ Update localStorage
//     const updatedUser = { ...user, cart: [] };
//     localStorage.setItem("user", JSON.stringify(updatedUser));

//     clearCart(false);
//   } catch (err) {
//     console.error("Order failed", err);
//   }
// };


//   return (
//     <OrderContext.Provider value={{ placeOrder }}>
//       {children}
//     </OrderContext.Provider>
//   );
// }


////////////


// import { createContext, useContext } from "react";
// import { CartContext } from "./CartContext";
// import { useAuth } from "./AuthContext";

// export const OrderContext = createContext();

// export function OrderProvider({ children }) {
//   // ✅ cart stays from CartContext
//   const { cart, clearCart } = useContext(CartContext);

//   // ✅ user MUST come from AuthContext
//   const auth = useAuth();
//   const user = auth?.user;

//   const placeOrder = async () => {
//     if (!user) {
//       alert("Please login to place order");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     const newOrder = {
//       userId: String(user.id),
//       items: cart,
//       total: cart.reduce(
//         (sum, item) => sum + item.price * item.qty,
//         0
//       ),
//       status: "Placed",
//       createdAt: new Date().toISOString()
//     };

//     try {
//       // 1️⃣ Save order
//       const res = await fetch("http://localhost:3000/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder)
//       });

//       if (!res.ok) {
//         throw new Error("Order POST failed");
//       }

//       // 2️⃣ Clear cart in DB
//       await fetch(`http://localhost:3000/users/${user.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cart: [] })
//       });

//       // 3️⃣ Sync localStorage (auth user)
//       const updatedUser = { ...user, cart: [] };
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       // 4️⃣ Clear cart state
//       clearCart();

//     } catch (err) {
//       console.error("Order failed", err);
//     }
//   };

//   return (
//     <OrderContext.Provider value={{ placeOrder }}>
//       {children}
//     </OrderContext.Provider>
//   );
// }

import { createContext, useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { cart, clearCart } = useContext(CartContext);
  const { user, setUser } = useAuth(); // ✅ NEED setUser

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
      orderId: crypto.randomUUID(),
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
      status: "Placed",
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [...(user.orders || []), newOrder];

    try {
      // ✅ Save orders INSIDE user
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: updatedOrders,
          cart: []
        })
      });

      // ✅ Update AuthContext + localStorage
      const updatedUser = {
        ...user,
        orders: updatedOrders,
        cart: []
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ Clear cart state
      clearCart();

      alert("Order placed successfully");
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
