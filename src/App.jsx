
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";

export default function App() {
  return (
    < div className=" bg-linear-to-br from-pink-100">
      <Navbar />
      <AppRoutes />
    </div>
  );
}
