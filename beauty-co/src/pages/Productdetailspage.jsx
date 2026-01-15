import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductSingleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const sizes = ["50ml", "100ml", "150ml"];
  const [selectedSize, setSelectedSize] = useState("50ml");

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      const allProducts = Object.values(res.data)
        .flatMap((cat) => Object.values(cat).flat());

      const found = allProducts.find((p) => p.id == id);
      setProduct(found);
    });
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  // 🔥 OFFER LOGIC
  const hasOffer = product.offer === true;
  const discountedPrice = hasOffer
    ? Math.round(product.price * 0.8)
    : product.price;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      qty,
    });
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-24 py-12 bg-[#F9F7F3] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">

        {/* IMAGE */}
        <div className="relative flex items-center justify-center bg-gray-100 rounded-lg p-6">

          {/* 🔴 OFFER LABEL */}
          {hasOffer && (
            <span
              className="
                absolute
                top-4
                left-4
                bg-red-600
                text-white
                text-sm
                font-semibold
                px-3
                py-1
                rounded
              "
            >
              20% OFF
            </span>
          )}

          <img
            src={product.img}
            alt={product.name}
            className="max-w-[420px] w-full object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-1">
            {product.brand}
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold mb-3">
            {product.name}
          </h1>

          {/* 💰 PRICE */}
          {hasOffer ? (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-pink-600">
                ₹{discountedPrice}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{product.price}
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-pink-600 mb-4">
              ₹{product.price}
            </p>
          )}

          <p className="text-gray-600 mb-6">
            {product.des}
          </p>

          {/* SIZE */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Select Size</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded border text-sm transition
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1"
              >
                −
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="
              w-full
              bg-pink-600
              text-white
              py-3
              rounded-lg
              font-medium
              hover:bg-pink-700
              transition
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
