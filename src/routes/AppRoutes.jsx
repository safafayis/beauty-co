import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetails from "../pages/Lips";
import ProductSingleDetails from "../pages/Productdetailspage";

import Cart from "../pages/Cart";
import Wishlist from "../Wishlist";
import Search from "../Search";
import Orders from "../Orders";
import PaymentPage from "../pages/Payment";
import Offers from "../Offers";  
import Sales from "../pages/sales";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/profile";
import ProtectedRoute from "./protectRoute";
import AdminProtectedRoute from "../Admin/AdminProtectedRoute";
// import { Route } from "react-router-dom";
import AdminLayout from "../Admin/AdminLayout";
import AdminDashboard from "../Admin/Dashboard";
import AdminProducts from "../Admin/ProductManagement";
import AdminUsers from "../Admin/UserManagement";
import AdminOrders from "../Admin/OrderManagement";



export default function AppRoutes() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />

    //   <Route path="/offers" element={<Offers />} /> 

    //   <Route path="/lips" element={<ProductDetails category="lips" />} />
    //   <Route path="/eyes" element={<ProductDetails category="eyes" />} />
    //   <Route path="/nails" element={<ProductDetails category="nails" />} />
    //   <Route path="/face" element={<ProductDetails category="face" />} />
    //   <Route path="/skin" element={<ProductDetails category="skin" />} />
    //   <Route path="/gifting" element={<ProductDetails category="gifting" />} />
    //   <Route path="/product/:id" element={<ProductSingleDetails />} />
    //   <Route path="/sales" element={<Sales />} />
    //   <Route path="/search" element={<Search />} />
    //   <Route path="/profile" element={<Profile />} />
    //   <Route path="/orders" element={<Orders />} />
    //   <Route path="/cart" element={<Cart />} />
    //   <Route path="/wishlist" element={<Wishlist />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/register" element={<Register />} />
    //   <Route path="/payment" element={<PaymentPage />} />
    // </Routes>

    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/offers" element={<Offers />} />

      <Route path="/lips" element={<ProductDetails category="lips" />} />
      <Route path="/eyes" element={<ProductDetails category="eyes" />} />
      <Route path="/nails" element={<ProductDetails category="nails" />} />
      <Route path="/face" element={<ProductDetails category="face" />} />
      <Route path="/skin" element={<ProductDetails category="skin" />} />
      <Route path="/gifting" element={<ProductDetails category="gifting" />} />

      <Route path="/product/:id" element={<ProductSingleDetails />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

           <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

