import { useState } from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function SizeModal({ product, onClose }) {
  const sizes = ["50ml", "100ml","150ml"];
  const [selected, setSelected] = useState(null);
const { addToCart } = useContext(CartContext);
  const handleAdd = (e) => {
    e.stopPropagation();
    if (!selected) return alert("Please select a size");

    addToCart({
  ...product,
  size: selected
});

    // console.log("Added to cart:", cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[300px] rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Select Size</h2>

        <div className="flex gap-2 mb-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelected(size)}
              className={`px-4 py-2 border rounded text-sm
                ${
                  selected === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
