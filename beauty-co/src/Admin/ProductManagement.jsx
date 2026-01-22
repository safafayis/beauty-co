import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyForm = {
    id: "",
    name: "",
    brand: "",
    price: "",
    img: "",
    des: "",
    offer: false,
    category: "",
    subcategory: ""
  };

  const [form, setForm] = useState(emptyForm);

  /* ================= SAFE FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = res.data;

      const flat = [];

      Object.entries(data).forEach(([category, subcats]) => {
        if (typeof subcats !== "object") return;

        Object.entries(subcats).forEach(([subcategory, items]) => {
          if (!Array.isArray(items)) return; // ✅ FIX

          items.forEach((item) => {
            flat.push({
              ...item,
              category,
              subcategory
            });
          });
        });
      });

      setProducts(flat);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (product) => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = res.data;

      const updatedSub = data[product.category][
        product.subcategory
      ].filter((p) => p.id !== product.id);

      await axios.patch("http://localhost:3000/products", {
        [product.category]: {
          ...data[product.category],
          [product.subcategory]: updatedSub
        }
      });

      setProducts((prev) =>
        prev.filter((p) => p.id !== product.id)
      );
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= FORM HANDLING ================= */
  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm(product);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* ================= ADD / EDIT ================= */
  const saveProduct = async () => {
    if (!form.category || !form.subcategory) {
      alert("Category & Subcategory required");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = res.data;

      const categoryData = data[form.category] || {};
      const subData = categoryData[form.subcategory] || [];

      let updatedSub;

      if (editingProduct) {
        // EDIT
        updatedSub = subData.map((p) =>
          p.id === form.id ? { ...form } : p
        );
      } else {
        // ADD
        const newProduct = {
          ...form,
          id: Date.now() + Math.floor(Math.random() * 1000)
        };

        updatedSub = [...subData, newProduct];
      }

      await axios.patch("http://localhost:3000/products", {
        [form.category]: {
          ...categoryData,
          [form.subcategory]: updatedSub
        }
      });

      fetchProducts();
      setShowForm(false);
    } catch (err) {
      alert("Save failed");
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <main className="w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={openAddForm}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
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
                key={`${p.category}-${p.subcategory}-${p.id}`}
                className="border-b text-sm hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{p.name}</td>
                <td className="capitalize">{p.category}</td>
                <td className="capitalize">{p.subcategory}</td>
                <td>₹{p.price}</td>
                <td>{p.offer ? "Yes" : "No"}</td>
                <td className="text-center space-x-3">
                  <button
                    onClick={() => openEditForm(p)}
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

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg space-y-3">
            <h2 className="text-xl font-bold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <input className="border p-2 w-full" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input className="border p-2 w-full" name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
            <input className="border p-2 w-full" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
            <input className="border p-2 w-full" name="img" value={form.img} onChange={handleChange} placeholder="Image URL" />
            <textarea className="border p-2 w-full" name="des" value={form.des} onChange={handleChange} placeholder="Description" />

            <input className="border p-2 w-full" name="category" value={form.category} onChange={handleChange} placeholder="Category (face, lips, eyes)" />
            <input className="border p-2 w-full" name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Subcategory (foundation, matte)" />

            <label className="flex gap-2 items-center">
              <input type="checkbox" name="offer" checked={form.offer} onChange={handleChange} />
              Offer
            </label>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
