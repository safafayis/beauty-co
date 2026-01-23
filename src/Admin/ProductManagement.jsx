import { useEffect, useState } from "react";
import axios from "axios";
import EditProductModal from "./EditProductModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = res.data;

      const flatProducts = [];

      Object.entries(data).forEach(([category, subcats]) => {
        Object.entries(subcats).forEach(([subcategory, items]) => {
          items.forEach((item) => {
            flatProducts.push({
              ...item,
              category,
              subcategory
            });
          });
        });
      });

      setProducts(flatProducts);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  const deleteProduct = async (product) => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const productsData = res.data;

      const updatedSubcategory =
        productsData[product.category][product.subcategory].filter(
          (p) => p.id !== product.id
        );

      await axios.patch("http://localhost:3000/products", {
        [product.category]: {
          ...productsData[product.category],
          [product.subcategory]: updatedSubcategory
        }
      });

      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm sm:text-base">
        Loading products...
      </p>
    );
  }

  return (
    <main className="w-full p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-lg sm:text-2xl font-bold">
          Product Management
        </h1>

        <button className="px-4 py-2 bg-green-600 text-white rounded text-sm sm:text-base hover:bg-green-700 transition">
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-xs sm:text-sm">
              <th className="p-3">Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Price</th>
              <th>Offer</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b text-xs sm:text-sm hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium break-words">{p.name}</td>
                <td className="capitalize">{p.category}</td>
                <td className="capitalize">{p.subcategory}</td>
                <td>₹{p.price}</td>
                <td>{p.offer ? "Yes" : "No"}</td>
                <td className="text-center space-x-3">
                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        onUpdated={fetchProducts}
      />
    </main>
  );
}
