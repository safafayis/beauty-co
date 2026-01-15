import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      {Object.entries(products).map(([category, items]) => (
        <div key={category} className="mb-16">

          {/* Category Title */}
          <h2 className="text-xl sm:text-2xl font-semibold capitalize mb-6">
            {category.replace(/([A-Z])/g, " $1")}
          </h2>

          {/* Products Grid */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              gap-4
            "
          >
            {items.map((product) => (
              <div key={product.id} className="flex">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
