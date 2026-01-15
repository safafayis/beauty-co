import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/product/ProductCard";

export default function Sales() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => {
        // flatten all categories → products
        const allProducts = Object.values(res.data)
          .flatMap((cat) => Object.values(cat).flat());

        // filter only offer products
        const offersOnly = allProducts.filter(
          (product) => product.offer === true
        );

        setSaleProducts(offersOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load sale products", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#F9F7F3]">
        <p className="text-lg">Loading sale products...</p>
      </section>
    );
  }

  return (
    <section className="px-6 sm:px-10 lg:px-24 py-16 bg-[#F9F7F3] min-h-screen">
      
      {/* PAGE TITLE */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-pink-700">
          Sales
        </h1>
        <p className="text-gray-600 mt-2">
          Enjoy up to 20% off on selected beauty essentials
        </p>
      </div>

      {/* EMPTY STATE */}
      {saleProducts.length === 0 ? (
        <p className="text-center text-gray-600">
          No sale products available right now.
        </p>
      ) : (
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-6
        ">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
