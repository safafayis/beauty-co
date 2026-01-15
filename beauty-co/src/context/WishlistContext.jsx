import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // Load user + wishlist
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setWishlist(parsed.wishlist || []);
    }
  }, []);

  const syncWishlistToDB = async (updatedWishlist) => {
    if (!user?.id) return;

    const updatedUser = { ...user, wishlist: updatedWishlist };

    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wishlist: updatedWishlist }),
    });

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // ❤️ ADD / REMOVE TOGGLE
  const toggleWishlist = (product) => {
    if (!user) return alert("Please login first");

    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);

      const updatedWishlist = exists
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product];

      syncWishlistToDB(updatedWishlist);
      return updatedWishlist;
    });
  };

  const isInWishlist = (id) =>
    wishlist.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
