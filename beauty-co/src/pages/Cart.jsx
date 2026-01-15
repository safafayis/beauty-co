import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } =
    useContext(CartContext);

  const { placeOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F9F7F3] px-6">
        <h2 className="text-2xl font-semibold mb-3">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-24 py-16 bg-[#F9F7F3] min-h-screen">
      <h1 className="text-3xl font-semibold mb-10">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm"
            >
              {/* IMAGE */}
              <div className="relative w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                
                {/* 🔴 OFFER LABEL */}
                {item.offer === true && (
                  <span
                    className="
                      absolute
                      top-1
                      left-1
                      bg-red-600
                      text-white
                      text-[10px]
                      font-semibold
                      px-1.5
                      py-0.5
                      rounded
                    "
                  >
                    20% OFF
                  </span>
                )}

                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="font-medium">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.brand}
                </p>

                <p className="font-semibold mt-2">
                  ₹{item.price}
                </p>

                <p className="mt-1 text-xs font-light text-gray-400">
                  {item.size}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQty(item.id, item.qty - 1)
                    }
                    className="px-2 border"
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      updateQty(item.id, item.qty + 1)
                    }
                    className="px-2 border"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.cartItemId)}
                className="text-sm text-red-500 hover:underline self-start sm:self-center"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Delivery</span>
            <span className="text-green-600">
              Free
            </span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          {/* PAYMENT */}
          <button
            onClick={() => navigate("/payment")}
            className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </section>
  );
}
