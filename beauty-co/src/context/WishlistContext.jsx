// import { createContext, useEffect, useState } from "react";

// export const WishlistContext = createContext();

// export function WishlistProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsed = JSON.parse(storedUser);
//       setUser(parsed);
//       setWishlist(parsed.wishlist || []);
//     }
//   }, []);

//   const syncWishlistToDB = async (updatedWishlist) => {
//     if (!user?.id) return;

//     const updatedUser = { ...user, wishlist: updatedWishlist };

//     await fetch(`http://localhost:3000/users/${user.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ wishlist: updatedWishlist }),
//     });

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };

//   const toggleWishlist = (product) => {
//     if (!user) return alert("Please login first");

//     setWishlist((prev) => {
//       const exists = prev.find((i) => i.id === product.id);

//       const updatedWishlist = exists
//         ? prev.filter((i) => i.id !== product.id)
//         : [...prev, product];

//       syncWishlistToDB(updatedWishlist);
//       return updatedWishlist;
//     });
//   };

//   const isInWishlist = (id) =>
//     wishlist.some((i) => i.id === id);

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         toggleWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const auth = useAuth(); // safe access
  const user = auth?.user;

  const [wishlist, setWishlist] = useState([]);

  // 🔄 load wishlist when user changes
  useEffect(() => {
    if (user) {
      setWishlist(user.wishlist || []);
    } else {
      setWishlist([]);
    }
  }, [user]);

  // 🔄 sync wishlist to DB + localStorage
  const syncWishlistToDB = async (updatedWishlist) => {
    if (!user?.id) return;

    try {
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: updatedWishlist })
      });

      // keep auth user in sync
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, wishlist: updatedWishlist })
      );
    } catch (err) {
      console.error("Wishlist sync failed:", err);
    }
  };

  // ❤️ TOGGLE WISHLIST
  const toggleWishlist = (product) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);

      const updatedWishlist = exists
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product];

      syncWishlistToDB(updatedWishlist);
      return updatedWishlist;
    });
  };

  // 🔍 CHECK IF IN WISHLIST
  const isInWishlist = (id) =>
    wishlist.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
