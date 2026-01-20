// import { useState } from "react";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([
//     {
//       id: 101,
//       customer: "Bella",
//       product: "Matte Lipstick",
//       total: "₹499",
//       status: "Pending"
//     },
//     {
//       id: 102,
//       customer: "Sara",
//       product: "Skin Serum",
//       total: "₹899",
//       status: "Delivered"
//     }
//   ]);

//   const updateStatus = (id, newStatus) => {
//     setOrders((prev) =>
//       prev.map((order) =>
//         order.id === id ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   return (
//     <div className="w-full">
//       <h1 className="text-xl sm:text-2xl font-bold mb-6">Order Management</h1>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full min-w-[700px] border-collapse">
//           <thead>
//             <tr className="border-b bg-gray-100 text-left text-sm">
//               <th className="p-3">Order ID</th>
//               <th>Customer</th>
//               <th>Product</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Update</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b text-sm">
//                 <td className="p-3">#{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.product}</td>
//                 <td>{order.total}</td>
//                 <td
//                   className={
//                     order.status === "Delivered"
//                       ? "text-green-600"
//                       : order.status === "Pending"
//                       ? "text-yellow-600"
//                       : "text-red-600"
//                   }
//                 >
//                   {order.status}
//                 </td>
//                 <td>
//                   <select
//                     value={order.status}
//                     onChange={(e) =>
//                       updateStatus(order.id, e.target.value)
//                     }
//                     className="border rounded px-2 py-1 text-xs sm:text-sm"
//                   >
//                     <option>Pending</option>
//                     <option>Shipped</option>
//                     <option>Delivered</option>
//                     <option>Cancelled</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

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

//       setOrders(allOrders);
//     } catch (err) {
//       console.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (orderId, userId, newStatus) => {
//     try {
//       const user = await axios.get(
//         `http://localhost:3000/users/${userId}`
//       );

//       const updatedOrders = user.data.orders.map((o) =>
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
//     return <p className="text-center mt-10">Loading orders...</p>;
//   }

//   return (
//     <div className="w-full">
//       <h1 className="text-xl sm:text-2xl font-bold mb-6">
//         Order Management
//       </h1>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full min-w-[700px] border-collapse">
//           <thead>
//             <tr className="border-b bg-gray-100 text-left text-sm">
//               <th className="p-3">Order ID</th>
//               <th>Customer</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Update</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b text-sm">
//                 <td className="p-3">#{order.id.slice(0, 8)}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.items?.length} items</td>
//                 <td>₹{order.total}</td>

//                 <td
//                   className={
//                     order.status === "Delivered"
//                       ? "text-green-600"
//                       : order.status === "Pending"
//                       ? "text-yellow-600"
//                       : order.status === "Shipped"
//                       ? "text-blue-600"
//                       : "text-red-600"
//                   }
//                 >
//                   {order.status}
//                 </td>

//                 <td>
//                   <select
//                     value={order.status}
//                     onChange={(e) =>
//                       updateStatus(
//                         order.id,
//                         order.userId,
//                         e.target.value
//                       )
//                     }
//                     className="border rounded px-2 py-1 text-xs sm:text-sm"
//                   >
//                     <option>Pending</option>
//                     <option>Shipped</option>
//                     <option>Delivered</option>
//                     <option>Cancelled</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
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

  useEffect(() => {
    fetchOrders();
  }, []);

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
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left text-xs sm:text-sm">
              <th className="p-3">Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-center">Update</th>
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
                      : order.status === "Placed" ||
                        order.status === "Pending"
                      ? "text-yellow-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {order.status}
                </td>

                <td className="text-center">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        order.userId,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 text-xs sm:text-sm focus:outline-none"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>k,
        </table>
      </div>
    </div>
  );
}



