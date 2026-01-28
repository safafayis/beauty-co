import { useEffect, useState } from "react";
import axios from "axios";

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [categories, setCategories] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    subcategory: "",
    offer: false,
    des: "",
    img: ""
  });

  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3000/products");
      const productsData = res.data;

      const { category, subcategory } = formData;

      if (category === "item") {
        alert("Invalid category");
        return;
      }

      if (!productsData[category]) {
        productsData[category] = {};
      }

      if (!productsData[category][subcategory]) {
        productsData[category][subcategory] = [];
      }

      productsData[category][subcategory].push({
        id: crypto.randomUUID(),
        name: formData.name,
        brand: formData.brand,
        price: Number(formData.price),
        img: formData.img || "https://via.placeholder.com/150",
        des: formData.des || "",
        offer: formData.offer
      });

      await axios.patch("http://localhost:3000/products", productsData);

      onProductAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <input
            name="name"
            placeholder="Product Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2"
          />

          {/* Brand */}
          <input
            name="brand"
            placeholder="Brand"
            required
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-2"
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2"
          />

          {/* Category */}
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Category</option>
            {Object.keys(categories)
              .filter((c) => c !== "item")
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

          {/* Subcategory */}
          <select
            name="subcategory"
            required
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Subcategory</option>
            {formData.category &&
              categories[formData.category] &&
              Object.keys(categories[formData.category]).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>

          {/* Description */}
          <textarea
            name="des"
            placeholder="Product Description"
            value={formData.des}
            onChange={handleChange}
            className="w-full border p-2"
            rows={3}
          />

          {/* Image URL */}
          <input
            name="img"
            type="url"
            placeholder="Image URL"
            value={formData.img}
            onChange={handleChange}
            className="w-full border p-2"
          />

          {/* Offer */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="offer"
              checked={formData.offer}
              onChange={handleChange}
            />
            Offer
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
