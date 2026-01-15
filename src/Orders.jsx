import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";

export default function Orders() {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/users/${user.id}`
        );
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view orders</p>
      </div>
    );
  }

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  // NO ORDERS
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No orders yet</p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-24 py-16 bg-[#F9F7F3] min-h-screen">
      <h1 className="text-3xl font-semibold mb-10">
        My Orders
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            {/* ORDER HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
              <div>
                <p className="font-medium text-lg">
                  Order #{order.id.slice(0, 6)}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <span className="mt-2 sm:mt-0 inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {order.status}
              </span>
            </div>

            {/* ORDER ITEMS */}
            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 py-4"
                >
                  {/* IMAGE */}
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full object-contain"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h3 className="font-medium text-sm sm:text-base">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {item.brand}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Size: {item.size}
                    </p>

                    <p className="text-sm mt-2">
                      Qty: {item.qty}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="text-sm font-medium">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER TOTAL */}
            <div className="flex justify-end mt-6">
              <p className="text-lg font-semibold">
                Total: ₹{order.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
