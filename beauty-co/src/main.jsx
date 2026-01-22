import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import Footer from "./components/Footer";

import { AuthProvider } from "./context/AuthContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <WishlistProvider>
    <CartProvider>
      <OrderProvider>
          <App />
      <Footer/>
      </OrderProvider>
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
