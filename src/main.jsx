import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import Footer from "./components/Footer";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <WishlistProvider>
    <CartProvider>
      <OrderProvider>
      <App />
      <Footer/>
      </OrderProvider>
    </CartProvider>
    </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
