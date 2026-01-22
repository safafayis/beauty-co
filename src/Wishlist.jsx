import { useContext } from "react";
import { WishlistContext } from "./context/WishlistContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0)
    return <p className="p-10">Your wishlist is empty ❤️</p>;

  return (
    <section className="p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {wishlist.map((item) => {
        const hasOffer = item.offer === true;
        const discountedPrice = hasOffer
          ? Math.round(item.price * 0.8)
          : item.price;

        return (
          <div
            key={item.id}
            className="relative border rounded-lg p-4 hover:shadow-md transition bg-white"
          >
            {hasOffer && (
              <span
                className="
                  absolute
                  top-2
                  left-2
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

            <img
              src={item.img}
              alt={item.name}
              className="h-32 mx-auto object-contain"
            />

            <h3 className="text-sm font-medium mt-3 line-clamp-2">
              {item.name}
            </h3>

            <div className="mt-2">
              {hasOffer ? (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-black">
                    ₹{discountedPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{item.price}
                  </span>
                </div>
              ) : (
                <p className="font-semibold">₹{item.price}</p>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(item)}
              className="text-red-500 text-sm mt-3 hover:underline"
            >
              Remove ❤️
            </button>
          </div>
        );
      })}
    </section>
  );
}
