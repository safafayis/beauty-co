import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import SizeModal from "../../pages/sizemodal";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [sizeOpen, setSizeOpen] = useState(false);

  // 🔥 OFFER LOGIC
  const hasOffer = product.offer === true;
  const discountPercent = 20;

  const discountedPrice = hasOffer
    ? Math.round(product.price * 0.8)
    : product.price;

  return (
    <div
      onClick={() => {
        if (!sizeOpen) {
          navigate(`/product/${product.id}`);
        }
      }}
      className="
        relative
        w-full
        max-w-[220px]
        sm:max-w-[250px]
        bg-white
        rounded-xl
        border
        border-gray-200
        hover:shadow-lg
        transition
        cursor-pointer
        flex
        flex-col
      "
    >
      {/* 🔴 OFFER BADGE */}
      {hasOffer && (
        <span
          className="
            absolute
            top-2
            left-2
            z-10
            bg-red-600
            text-white
            text-xs
            font-semibold
            px-2
            py-1
            rounded
          "
        >
          20% OFF
        </span>
      )}

      {/* ❤️ WISHLIST */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="
          absolute top-2 right-2 z-10
          bg-white/90 backdrop-blur
          rounded-full
          p-2
          text-lg
          shadow
          hover:scale-110
          transition
        "
      >
        {isInWishlist(product.id) ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <div className="h-[170px] sm:h-[190px] bg-gray-50 rounded-t-xl flex items-center justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base font-medium line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {product.brand}
        </p>

        <div className="mt-auto">
          {/* 💰 PRICE */}
          <div className="mt-2">
            {hasOffer ? (
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-semibold text-black">
                  ₹{discountedPrice}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  ₹{product.price}
                </span>
              </div>
            ) : (
              <p className="text-sm sm:text-base font-semibold">
                ₹{product.price}
              </p>
            )}
          </div>

          {/* 🛒 ADD TO BAG */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSizeOpen(true);
            }}
            className="
              mt-3
              w-full
              py-2
              text-xs sm:text-sm
              font-medium
              border
              border-black
              rounded-md
              hover:bg-black
              hover:text-white
              transition
            "
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* SIZE MODAL */}
      {sizeOpen && (
        <SizeModal
          product={product}
          onClose={() => setSizeOpen(false)}
        />
      )}
    </div>
  );
}
