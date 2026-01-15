import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const existing = await axios.get(
        `http://localhost:3001/users?email=${form.email}`
      );

      if (existing.data.length > 0) {
        setError("Email already registered");
        return;
      }

      await axios.post("http://localhost:3001/users", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      setSuccess("Account created successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="flex h-screen font-serif">

      {/* LEFT – same as Login */}
      <div className="w-full lg:w-1/2 relative flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/7d/1b/a3/7d1ba3b75c6307d21a73ce2aac17d642.jpg')"
          }}
        />

        {/* Cream Overlay */}
        <div className="absolute inset-0 bg-[#F3EFE8]/75" />

        {/* Content */}
        <div className="relative z-10 w-full px-10 lg:px-20">
          <div className="text-xl mb-10">Beauty Co.</div>

          <h1 className="text-4xl mb-2">Create account</h1>
          <p className="text-softGray mb-8">
            Join us and start your beauty journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
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
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-borderGray bg-transparent px-3 py-3 focus:outline-none focus:border-black"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button className="w-full bg-black text-white py-3 hover:opacity-90">
              Create Account
            </button>
          </form>

          <p className="mt-8 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT – same as Login */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/69/a8/ca/69a8ca12ba1baec4fcf5267d2875203c.jpg')"
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />

        <div className="absolute bottom-16 left-16 text-white max-w-sm">
          <h2 className="text-4xl font-light tracking-wide mb-2">
            Beauty <span className="text-2xl">Co</span>
          </h2>
          <p className="text-sm opacity-90">
            A modern beauty muse redefining elegance and confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
