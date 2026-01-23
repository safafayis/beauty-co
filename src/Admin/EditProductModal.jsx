import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onUpdated
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({ ...product });
    }
  }, [product]);

  if (!isOpen || !form) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const saveChanges = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = res.data;

      const updatedSubcategory =
        data[form.category][form.subcategory].map((p) =>
          p.id === form.id ? { ...form } : p
        );

      await axios.patch("http://localhost:3000/products", {
        [form.category]: {
          ...data[form.category],
          [form.subcategory]: updatedSubcategory
        }
      });

      onUpdated();
      onClose();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg space-y-3">
        <h2 className="text-lg font-bold">Edit Product</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Product name"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Price"
        />

        <input
          name="brand"
          value={form.brand || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Brand"
        />

        <textarea
          name="des"
          value={form.des || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Description"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="offer"
            checked={form.offer || false}
            onChange={handleChange}
          />
          Offer Product
        </label>

        <div className="flex justify-end gap-3 pt-3">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
