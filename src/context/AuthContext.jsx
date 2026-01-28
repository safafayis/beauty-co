import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setLoading(false);
        return;
      }

      const cachedUser = JSON.parse(stored);

      // 🔒 SAFETY GUARD
      if (!cachedUser?.id) {
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/users/${cachedUser.id}`
        );

        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to sync user", err);
        setUser(null);
        localStorage.removeItem("user");
      }

      setLoading(false);
    };

    syncUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );

    if (!res.data.length) {
      throw new Error("Invalid email or password");
    }

    const dbUser = res.data[0];

    if (dbUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    if (dbUser.blocked) {
      throw new Error("Your account has been blocked");
    }

    setUser(dbUser);
    localStorage.setItem("user", JSON.stringify(dbUser));
    return dbUser;
  };

  const register = async (form) => {
    const existing = await axios.get(
      `http://localhost:3000/users?email=${form.email}`
    );

    if (existing.data.length) {
      throw new Error("Email already registered");
    }

    await axios.post("http://localhost:3000/users", {
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: "user",
      blocked: false,
      cart: [],
      wishlist: [],
      orders: [],
      address: {}
    });
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
