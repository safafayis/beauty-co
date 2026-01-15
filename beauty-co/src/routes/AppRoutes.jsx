// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
// import Cart from "../pages/Cart";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ProductDetails from "../pages/Lips";
// import ProductSingleDetails from "../pages/Productdetailspage";
// import Wishlist from "../Wishlist";
// import Profile from "../pages/profile";
// import Orders from "../Orders";
// import Search from "../Search";
// import PaymentPage from "../pages/Payment";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* HOME */}
//       <Route path="/" element={<Home />} />

//       {/* CATEGORY PAGES */}
//       <Route path="/lips" element={<ProductDetails category="lips" />} />
//       <Route path="/eyes" element={<ProductDetails category="eyes" />} />
//       <Route path="/nails" element={<ProductDetails category="nails" />} />
//       <Route path="/face" element={<ProductDetails category="face" />} />
//       <Route path="/skin" element={<ProductDetails category="skin" />} />
//       <Route path="/gifting" element={<ProductDetails category="gifting" />} />

//       {/* PRODUCT */}
//       <Route path="/product/:id" element={<ProductSingleDetails />} />

//       {/* SEARCH */}
//       <Route path="/search" element={<Search />} /> {/* 🔥 NEW */}

//       {/* USER */}
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/orders" element={<Orders />} />

//       {/* CART & WISHLIST */}
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/wishlist" element={<Wishlist />} />

//       {/* AUTH */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Payment */}
//       <Route path="/payment" element={<PaymentPage />} />
//     </Routes>
//   );
// }



import { Routes, Route } from "react-router-dom";

/* MAIN PAGES */
import Home from "../pages/Home";
import ProductDetails from "../pages/Lips";
import ProductSingleDetails from "../pages/Productdetailspage";

/* FEATURES */
import Cart from "../pages/Cart";
import Wishlist from "../Wishlist";
import Search from "../Search";
import Orders from "../Orders";
import PaymentPage from "../pages/Payment";
import Offers from "../Offers";  // 🔥 SALES PAGE
import Sales from "../pages/sales";

/* AUTH / USER */
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* SALES / OFFERS */}
      <Route path="/offers" element={<Offers />} /> {/* 🔥 NEW */}

      {/* CATEGORY PAGES */}
      <Route path="/lips" element={<ProductDetails category="lips" />} />
      <Route path="/eyes" element={<ProductDetails category="eyes" />} />
      <Route path="/nails" element={<ProductDetails category="nails" />} />
      <Route path="/face" element={<ProductDetails category="face" />} />
      <Route path="/skin" element={<ProductDetails category="skin" />} />
      <Route path="/gifting" element={<ProductDetails category="gifting" />} />

      {/* PRODUCT DETAILS */}
      <Route path="/product/:id" element={<ProductSingleDetails />} />
      <Route path="/sales" element={<Sales />} />

      {/* SEARCH */}
      <Route path="/search" element={<Search />} />

      {/* USER */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />

      {/* CART & WISHLIST */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PAYMENT */}
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

