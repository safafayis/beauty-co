// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   try {
//     const res = await axios.get(
//       `http://localhost:3000/users?user.email=${form.email}&user.password=${form.password}`
//     );

//     if (res.data.length === 0) {
//       setError("Invalid email or password");
//       return;
//     }

//     // ✅ Store correct logged-in user
//     localStorage.setItem("user", JSON.stringify(res.data[0]));

//     navigate("/");
//   } catch (err) {
//     setError("Server error. Please try again.");
//   }
// };


//   return (
//     <div className="flex h-screen bg-cream font-serif">
//       {/* LEFT */}
//       <div className="w-full lg:w-1/2 relative flex items-center">
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://i.pinimg.com/736x/7d/1b/a3/7d1ba3b75c6307d21a73ce2aac17d642.jpg')"
//           }}
//         />

//         {/* Soft Overlay */}
//         <div className="absolute inset-0 bg-[#F3EFE8]/70" />

//         {/* Content */}
//         <div className="relative z-10 w-full flex flex-col justify-center px-10 lg:px-20">
//           <div className="text-xl mb-10">Beauty Co.</div>

//           <h1 className="text-4xl mb-2">Welcome back!</h1>
//           <p className="text-softGray mb-8">
//             Login to continue your beauty journey
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block mb-1 text-sm">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
//               />
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm">{error}</p>
//             )}

//             <button className="w-full bg-black text-white py-3 hover:opacity-90 transition">
//               Sign In
//             </button>

//             <button
//               type="button"
//               className="w-full border py-3 flex items-center justify-center gap-3"
//             >
//               <img
//                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                 className="w-4"
//                 alt="google"
//               />
//               Sign in with Google
//             </button>
//           </form>

//           <p className="mt-8 text-sm">
//             Don’t have an account?{" "}
//             <span
//               onClick={() => navigate("/register")}
//               className="underline cursor-pointer"
//             >
//               Sign up
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="hidden lg:block w-[55%] relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center scale-105"
//           style={{
//             backgroundImage:
//               "url('https://i.pinimg.com/1200x/69/a8/ca/69a8ca12ba1baec4fcf5267d2875203c.jpg')"
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//         <div className="absolute bottom-16 left-16 text-white max-w-sm">
//           <h2 className="text-4xl font-light tracking-wide mb-2">
//             Beauty<span className="text-2xl ml-1">-CO</span>
//           </h2>
//           <p className="text-sm leading-relaxed opacity-90">
//             A modern beauty muse redefining elegance and confidence.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(form.email, form.password);

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream font-serif">
      <div className="w-full lg:w-1/2 relative flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/7d/1b/a3/7d1ba3b75c6307d21a73ce2aac17d642.jpg')"
          }}
        />

        <div className="absolute inset-0 bg-[#F3EFE8]/70" />

        <div className="relative z-10 w-full flex flex-col justify-center px-6 sm:px-10 lg:px-20">
          <div className="text-xl mb-10">Beauty Co.</div>

          <h1 className="text-3xl sm:text-4xl mb-2">Welcome back!</h1>
          <p className="text-softGray mb-8">
            Login to continue your beauty journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="w-full bg-black text-white py-3 hover:opacity-90 transition">
              Sign In
            </button>

            <button
              type="button"
              className="w-full border py-3 flex items-center justify-center gap-3"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-4"
                alt="google"
              />
              Sign in with Google
            </button>
          </form>

          <p className="mt-8 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      <div className="hidden lg:block w-[55%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/69/a8/ca/69a8ca12ba1baec4fcf5267d2875203c.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-16 left-16 text-white max-w-sm">
          <h2 className="text-4xl font-light tracking-wide mb-2">
            Beauty<span className="text-2xl ml-1">-CO</span>
          </h2>
          <p className="text-sm leading-relaxed opacity-90">
            A modern beauty muse redefining elegance and confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
