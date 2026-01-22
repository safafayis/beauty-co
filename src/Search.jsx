import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    axios.get("http://localhost:3000/products").then((res) => {
      const allProducts = Object.values(res.data)
        .flatMap((cat) => Object.values(cat).flat());

      const filtered = allProducts.filter((p) =>
        `${p.name} ${p.brand}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );

      setProducts(filtered);
      setLoading(false);
    });
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="px-6 sm:px-10 lg:px-24 py-16 bg-[#F9F7F3] min-h-screen">
      <h1 className="text-2xl font-semibold mb-8">
        Search results for “{query}”
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((p) => (
            <div
              key={`${p.id}-${p.brand}`}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white p-4 border rounded cursor-pointer hover:shadow-md transition"
            >
              <div className="h-36 mb-4 bg-gray-100 flex items-center justify-center">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full object-contain"
                />
              </div>
              <h4 className="text-sm mb-1 line-clamp-2">
                {p.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                {p.brand}
              </p>
              <p className="font-medium">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
