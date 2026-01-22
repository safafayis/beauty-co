import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 text-2xl font-bold text-pink-600">
          Beauty-Co Admin
        </div>

        <nav className="px-4 space-y-2">
          <NavLink to="/admin" end className={navStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navStyle}>
            Products
          </NavLink>
          <NavLink to="/admin/users" className={navStyle}>
            Users
          </NavLink>
          <NavLink to="/admin/orders" className={navStyle}>
            Orders
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 px-4 py-2 bg-black text-white rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="font-semibold">Admin Panel</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function navStyle({ isActive }) {
  return isActive
    ? "block px-4 py-2 rounded bg-pink-100 text-pink-700 font-medium"
    : "block px-4 py-2 rounded hover:bg-pink-50";
}
