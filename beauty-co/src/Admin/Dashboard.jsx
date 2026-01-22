
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

  useEffect(() => {
    console.log(salesData);
    
  }, [salesData])
  

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
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, i) => {
          const gradients = [
            'bg-gradient-to-br from-green-400 to-green-600',
            'bg-gradient-to-br from-blue-400 to-blue-600',
            'bg-gradient-to-br from-purple-400 to-purple-600',
            'bg-gradient-to-br from-orange-400 to-orange-600'
          ];
          const icons = ['💰', '👥', '📦', '🛒'];
          
          return (
            <div
              key={i}
              className={`${gradients[i]} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="text-sm font-medium opacity-90 mb-1">{item.title}</p>
                  <h2 className="text-2xl sm:text-3xl font-bold">{item.value}</h2>
                </div>
                <div className="text-4xl opacity-80">{icons[i]}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Sales Statistics Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 text-base sm:text-lg text-gray-800">
            📈 Sales Statistics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={salesData.length > 0 ? salesData : [{ month: 'No Data', sales: 0 }]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '500' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '10px'
                }}
                cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
              />
              <Bar
                dataKey="sales"
                fill="url(#colorSales)"
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 text-base sm:text-lg text-gray-800">
            📦 Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={shipmentData.filter(item => item.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="42%"
                outerRadius={85}
                innerRadius={50}
                paddingAngle={4}
                animationDuration={1500}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  name
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 30;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#374151"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      style={{ fontSize: '13px', fontWeight: '700' }}
                    >
                      {`${name}`}
                    </text>
                  );
                }}
                labelLine={{
                  stroke: '#9ca3af',
                  strokeWidth: 1.5
                }}
              >
                {shipmentData.filter(item => item.value > 0).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index]}
                    style={{ 
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '8px 12px'
                }}
                formatter={(value, name) => [`${value} orders (${((value / shipmentData.filter(d => d.value > 0).reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%)`, name]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={50}
                iconType="circle"
                iconSize={10}
                wrapperStyle={{
                  paddingTop: '15px'
                }}
                formatter={(value, entry) => {
                  const item = shipmentData.find(d => d.name === value);
                  if (!item || item.value === 0) return null;
                  const total = shipmentData.reduce((sum, d) => sum + d.value, 0);
                  const percentage = ((item.value / total) * 100).toFixed(0);
                  return (
                    <span style={{ 
                      color: '#374151', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      marginLeft: '5px'
                    }}>
                      {value} ({percentage}%)
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold mb-4 text-base sm:text-lg text-gray-800">
          🕒 Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((o) => (
                <tr 
                  key={o.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    #{o.orderId.slice(0, 8)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : o.status === "Placed"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-gray-900">
                    ₹{o.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}