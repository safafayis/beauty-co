// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer
// } from "recharts";

// export default function AdminDashboard() {
//   const stats = [
//     { title: "Total Sales", value: "₹1,00,400" },
//     { title: "Customers", value: "2,040" },
//     { title: "Products", value: "240" },
//     { title: "Orders", value: "160" }
//   ];

//   const salesData = [
//     { month: "Jan", sales: 4000 },
//     { month: "Feb", sales: 3000 },
//     { month: "Mar", sales: 5000 },
//     { month: "Apr", sales: 4500 },
//     { month: "May", sales: 6000 }
//   ];

//   const shipmentData = [
//     { name: "Delivered", value: 60 },
//     { name: "Pending", value: 25 },
//     { name: "Cancelled", value: 15 }
//   ];

//   const orders = [
//     {
//       id: 1,
//       customer: "Bella",
//       product: "Matte Lipstick",
//       status: "Pending",
//       total: "₹499"
//     },
//     {
//       id: 2,
//       customer: "Sara",
//       product: "Skin Serum",
//       status: "Delivered",
//       total: "₹899"
//     }
//   ];

//   const COLORS = ["#22c55e", "#facc15", "#ef4444"];

//   return (
//     <div className="w-full">
//       <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((item, i) => (
//           <div key={i} className="bg-white p-4 rounded shadow">
//             <p className="text-gray-500 text-sm">{item.title}</p>
//             <h2 className="text-lg sm:text-xl font-bold">{item.value}</h2>
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         <div className="lg:col-span-2 bg-white p-4 rounded shadow h-[320px]">
//           <h2 className="font-semibold mb-3 text-sm sm:text-base">
//             Sales Statistics
//           </h2>

//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={salesData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#22c55e"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-4 rounded shadow h-[320px]">
//           <h2 className="font-semibold mb-3 text-sm sm:text-base">
//             Shipment Status
//           </h2>

//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={shipmentData}
//                 dataKey="value"
//                 outerRadius="70%"
//                 label
//               >
//                 {shipmentData.map((_, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-3 text-sm sm:text-base">
//           Recent Orders
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[500px] border-collapse">
//             <thead>
//               <tr className="border-b text-left text-sm">
//                 <th className="py-2">Customer</th>
//                 <th>Product</th>
//                 <th>Status</th>
//                 <th>Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id} className="border-b text-sm">
//                   <td className="py-2">{order.customer}</td>
//                   <td>{order.product}</td>
//                   <td
//                     className={
//                       order.status === "Delivered"
//                         ? "text-green-600"
//                         : order.status === "Pending"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }
//                   >
//                     {order.status}
//                   </td>
//                   <td>{order.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer
// } from "recharts";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState([]);
//   const [salesData, setSalesData] = useState([]);
//   const [shipmentData, setShipmentData] = useState([]);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     const usersRes = await axios.get("http://localhost:3000/users");
//     const productsRes = await axios.get("http://localhost:3000/products");

//     const users = usersRes.data;
//     const productsObj = productsRes.data;

//     let allOrders = [];
//     let totalRevenue = 0;

//     users.forEach((u) => {
//       u.orders?.forEach((o) => {
//         allOrders.push(o);
//         totalRevenue += o.total;
//       });
//     });

//     const flatProducts = Object.values(productsObj)
//       .flatMap((cat) => Object.values(cat).flat());

//     setStats([
//       { title: "Total Sales", value: `₹${totalRevenue}` },
//       { title: "Customers", value: users.length },
//       { title: "Products", value: flatProducts.length },
//       { title: "Orders", value: allOrders.length }
//     ]);

//     const monthlyMap = {};
//     allOrders.forEach((o) => {
//       const month = new Date(o.createdAt).toLocaleString("default", {
//         month: "short"
//       });
//       monthlyMap[month] = (monthlyMap[month] || 0) + o.total;
//     });

//     setSalesData(
//       Object.entries(monthlyMap).map(([month, sales]) => ({
//         month,
//         sales
//       }))
//     );

//     const statusMap = { Delivered: 0, Pending: 0, Cancelled: 0 };

//     allOrders.forEach((o) => {
//       statusMap[o.status] = (statusMap[o.status] || 0) + 1;
//     });

//     setShipmentData(
//       Object.entries(statusMap).map(([name, value]) => ({
//         name,
//         value
//       }))
//     );

//     setOrders(allOrders.slice(-5).reverse());
//   };

//   const COLORS = ["#22c55e", "#facc15", "#ef4444"];

//   return (
//     <div className="w-full">
//       <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard</h1>

//       {/* STATS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((item, i) => (
//           <div key={i} className="bg-white p-4 rounded shadow">
//             <p className="text-gray-500 text-sm">{item.title}</p>
//             <h2 className="text-lg sm:text-xl font-bold">{item.value}</h2>
//           </div>
//         ))}
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         <div className="lg:col-span-2 bg-white p-4 rounded shadow h-[320px]">
//           <h2 className="font-semibold mb-3 text-sm sm:text-base">
//             Sales Statistics
//           </h2>

//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={salesData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#22c55e"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-4 rounded shadow h-[320px]">
//           <h2 className="font-semibold mb-3 text-sm sm:text-base">
//             Shipment Status
//           </h2>

//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie data={shipmentData} dataKey="value" outerRadius="70%" label>
//                 {shipmentData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* RECENT ORDERS */}
//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="font-semibold mb-3 text-sm sm:text-base">
//           Recent Orders
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[500px] border-collapse">
//             <thead>
//               <tr className="border-b text-left text-sm">
//                 <th className="py-2">Order ID</th>
//                 <th>Status</th>
//                 <th>Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map((o) => (
//                 <tr key={o.id} className="border-b text-sm">
//                   <td className="py-2">{o.id.slice(0, 8)}</td>
//                   <td
//                     className={
//                       o.status === "Delivered"
//                         ? "text-green-600"
//                         : o.status === "Pending"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }
//                   >
//                     {o.status}
//                   </td>
//                   <td>₹{o.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:3000/users");
      const productsRes = await axios.get("http://localhost:3000/products");

      const users = usersRes.data;
      const products = productsRes.data;

      let allOrders = [];
      let revenue = 0;

      users.forEach((u) => {
        u.orders?.forEach((o) => {
          allOrders.push(o);
          revenue += o.total;
        });
      });

      const flatProducts = Object.values(products).flatMap((cat) =>
        Object.values(cat).flat()
      );

      setStats([
        { title: "Total Sales", value: `₹${revenue}` },
        { title: "Customers", value: users.length },
        { title: "Products", value: flatProducts.length },
        { title: "Orders", value: allOrders.length }
      ]);

      const monthlyMap = {};
      allOrders.forEach((o) => {
        const month = new Date(o.createdAt).toLocaleString("default", {
          month: "short"
        });
        monthlyMap[month] = (monthlyMap[month] || 0) + o.total;
      });

      setSalesData(
        Object.entries(monthlyMap).map(([month, sales]) => ({
          month,
          sales
        }))
      );

      const statusMap = {
        Placed: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0
      };

      allOrders.forEach((o) => {
        statusMap[o.status] = (statusMap[o.status] || 0) + 1;
      });

      setShipmentData(
        Object.entries(statusMap).map(([name, value]) => ({
          name,
          value
        }))
      );

      setRecentOrders(allOrders.slice(-5).reverse());
    } catch (err) {
      console.error("Dashboard fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded shadow flex flex-col"
          >
            <span className="text-gray-500 text-sm">{item.title}</span>
            <span className="text-lg sm:text-xl font-bold mt-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow h-[300px] sm:h-[350px]">
          <h2 className="font-semibold mb-3 text-sm sm:text-base">
            Sales Statistics
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow h-[300px] sm:h-[350px]">
          <h2 className="font-semibold mb-3 text-sm sm:text-base">
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={shipmentData}
                dataKey="value"
                outerRadius="70%"
                label
              >
                {shipmentData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3 text-sm sm:text-base">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b text-left text-sm">
                <th className="py-2">Order ID</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b text-sm">
                  <td className="py-2">{o.id.slice(0, 8)}</td>
                  <td
                    className={
                      o.status === "Delivered"
                        ? "text-green-600"
                        : o.status === "Shipped"
                        ? "text-blue-600"
                        : o.status === "Placed"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {o.status}
                  </td>
                  <td>₹{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
