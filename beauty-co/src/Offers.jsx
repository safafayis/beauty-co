import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      const flatProducts = Object.values(res.data)
        .flatMap((cat) => Object.values(cat).flat());

      const discounted = flatProducts
        .filter((p) => p.price > 1000)
        .map((p) => ({
          ...p,
          offerPrice: Math.floor(p.price * 0.75),
        }));

      setOffers(discounted);
    });
  }, []);

  return (
    <section className="px-6 md:px-24 py-16 bg-[#F9F7F3] min-h-screen">
      <h1 className="text-3xl font-semibold mb-10">
        🔥 Sale & Offers
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {offers.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white p-4 border rounded hover:shadow-md transition cursor-pointer"
          >
            <div className="h-40 mb-4 flex items-center justify-center bg-gray-100 relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                25% OFF
              </span>
              <img src={p.img} alt={p.name} className="h-full object-contain" />
            </div>

            <h4 className="text-sm line-clamp-2">{p.name}</h4>
            <p className="text-xs text-gray-500">{p.brand}</p>

            <p className="text-sm line-through text-gray-400">
              ₹{p.price}
            </p>
            <p className="font-semibold text-pink-600">
              ₹{p.offerPrice}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
