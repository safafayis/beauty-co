// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/users");
//       const users = res.data;

//       const allOrders = [];

//       users.forEach((u) => {
//         u.orders?.forEach((o) => {
//           allOrders.push({
//             ...o,
//             userId: u.id,
//             customer: u.user?.name || "Unknown"
//           });
//         });
//       });

//       setOrders(allOrders.reverse());
//     } catch (err) {
//       console.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (orderId, userId, newStatus) => {
//     try {
//       const userRes = await axios.get(
//         `http://localhost:3000/users/${userId}`
//       );

//       const updatedOrders = userRes.data.orders.map((o) =>
//         o.id === orderId ? { ...o, status: newStatus } : o
//       );

//       await axios.patch(`http://localhost:3000/users/${userId}`, {
//         orders: updatedOrders
//       });

//       setOrders((prev) =>
//         prev.map((o) =>
//           o.id === orderId ? { ...o, status: newStatus } : o
//         )
//       );
//     } catch (err) {
//       alert("Failed to update order status");
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center mt-10 text-sm sm:text-base">
//         Loading orders...
//       </p>
//     );
//   }

//   return (
//     <div className="w-full p-4 sm:p-6">
//       <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
//         Order Management
//       </h1>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full min-w-[850px] border-collapse">
//           <thead>
//             <tr className="border-b bg-gray-100 text-left text-xs sm:text-sm">
//               <th className="p-3">Order ID</th>
//               <th>Customer</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th className="text-center">Update</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr
//                 key={order.id}
//                 className="border-b text-xs sm:text-sm hover:bg-gray-50 transition"
//               >
//                 <td className="p-3 font-medium">
//                   #{order.id.slice(0, 8)}
//                 </td>

//                 <td className="capitalize">{order.customer}</td>

//                 <td>{order.items?.length || 0}</td>

//                 <td className="font-medium">₹{order.total}</td>

//                 <td
//                   className={
//                     order.status === "Delivered"
//                       ? "text-green-600 font-medium"
//                       : order.status === "Shipped"
//                       ? "text-blue-600 font-medium"
//                       : order.status === "Placed" ||
//                         order.status === "Pending"
//                       ? "text-yellow-600 font-medium"
//                       : "text-red-600 font-medium"
//                   }
//                 >
//                   {order.status}
//                 </td>

//                 <td className="text-center">
//                   <select
//                     value={order.status}
//                     onChange={(e) =>
//                       updateStatus(
//                         order.id,
//                         order.userId,
//                         e.target.value
//                       )
//                     }
//                     className="border rounded px-2 py-1 text-xs sm:text-sm focus:outline-none"
//                   >
//                     <option>Pending</option>
//                     <option>Shipped</option>
//                     <option>Delivered</option>
//                     <option>Cancelled</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>k,
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      const allOrders = [];

      users.forEach((u) => {
        u.orders?.forEach((o) => {
          allOrders.push({
            ...o,
            userId: u.id,
            customer: u.user?.name || "Unknown"
          });
        });
      });

      setOrders(allOrders.reverse());
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (orderId, userId, newStatus) => {
    try {
      const userRes = await axios.get(
        `http://localhost:3000/users/${userId}`
      );

      const updatedOrders = userRes.data.orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );

      await axios.patch(`http://localhost:3000/users/${userId}`, {
        orders: updatedOrders
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm sm:text-base">
        Loading orders...
      </p>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
        Order Management
      </h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left text-xs sm:text-sm">
              <th className="p-3">Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b text-xs sm:text-sm hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">
                  #{order.id.slice(0, 8)}
                </td>

                <td className="capitalize">{order.customer}</td>

                <td>{order.items?.length || 0}</td>

                <td className="font-medium">₹{order.total}</td>

                <td
                  className={
                    order.status === "Delivered"
                      ? "text-green-600 font-medium"
                      : order.status === "Shipped"
                      ? "text-blue-600 font-medium"
                      : order.status === "Placed" || order.status === "Pending"
                      ? "text-yellow-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {order.status}
                </td>

                <td className="flex gap-2 justify-center items-center py-2">
                  {/* VIEW PRODUCTS */}
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-black"
                  >
                    View
                  </button>

                  {/* UPDATE STATUS */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        order.userId,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 text-xs focus:outline-none"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW PRODUCTS MODAL ================= */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">

            <h2 className="text-lg font-bold mb-4">
              Order #{selectedOrder.id.slice(0, 8)}
            </h2>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 border rounded p-3 items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-gray-100 rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Size: {item.size} | Qty: {item.qty}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="font-bold">
                Total: ₹{selectedOrder.total}
              </p>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedOrder(null);
                }}
                className="px-4 py-1 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



