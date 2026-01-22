// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiSearch,
//   FiUser,
//   FiShoppingBag,
//   FiHeart,
//   FiX
// } from "react-icons/fi";
// import { useContext, useRef, useState } from "react";
// import { CartContext } from "../../context/CartContext";
// import { WishlistContext } from "../../context/WishlistContext";

// export default function Navbar() {
//   const { cart } = useContext(CartContext);
//   const { wishlist } = useContext(WishlistContext)

//   const navigate = useNavigate();

//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState("");
//   const inputRef = useRef(null);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     navigate(`/search?q=${query}`);
//     setQuery("");
//     setShowSearch(false);
//   };

//   return (
//     <header className="w-full border-b bg-white sticky top-0 z-50">
//       <div className="flex items-center justify-between px-6 md:px-10 py-4">

//         {/* LOGO */}
//         <Link to="/" className="text-2xl font-bold tracking-wide">
//           Beauty-Co
//         </Link>

//         {/* MAIN MENU */}
//         <nav className="hidden md:flex gap-8 text-sm font-medium uppercase">
//           <Link to="/lips" className="hover:underline">Lips</Link>
//           <Link to="/eyes" className="hover:underline">Eyes</Link>
//           <Link to="/face" className="hover:underline">Face</Link>
//           <Link to="/nails" className="hover:underline">Nails</Link>
//           <Link to="/skin" className="hover:underline">Skin</Link>
//           <Link to="/gifting" className="hover:underline">Gifting</Link>
//         </nav>

//         {/* RIGHT ICONS */}
//         <div className="flex items-center gap-6 text-xl relative">

//           {/* 🔍 SEARCH */}
//           {showSearch ? (
//             <form
//               onSubmit={handleSearch}
//               className="absolute right-0 top-10 bg-white border rounded shadow-md flex items-center px-2 py-1"
//             >
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Search products..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="px-2 py-1 text-sm outline-none w-40 md:w-52"
//                 autoFocus
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowSearch(false);
//                   setQuery("");
//                 }}
//                 className="text-lg px-1"
//               >
//                 <FiX />
//               </button>
//             </form>
//           ) : (
//             <button
//               aria-label="Search"
//               onClick={() => setShowSearch(true)}
//             >
//               <FiSearch />
//             </button>
//           )}

//           {/* WISHLIST */}
//           <Link to="/wishlist" aria-label="Wishlist" className="relative">
//             <FiHeart />
//             {wishlist.length > 0 && (
//               <span
//                 className="
//                   absolute
//                   -top-2
//                   -right-2
//                   bg-black
//                   text-white
//                   text-xs
//                   min-w-[18px]
//                   h-[18px]
//                   flex
//                   items-center
//                   justify-center
//                   rounded-full
//                 "
//               >
//                 {wishlist.length}
//               </span>
//             )}
//           </Link>

//           {/* CART */}
//           <Link to="/cart" aria-label="Cart" className="relative">
//             <FiShoppingBag />

//             {cart.length > 0 && (
//               <span
//                 className="
//                   absolute
//                   -top-2
//                   -right-2
//                   bg-black
//                   text-white
//                   text-xs
//                   min-w-[18px]
//                   h-[18px]
//                   flex
//                   items-center
//                   justify-center
//                   rounded-full
//                 "
//               >
//                 {cart.length}
//               </span>
//             )}
//           </Link>

//           {/* PROFILE */}
//           <Link to="/profile" aria-label="Profile">
//             <FiUser />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiX
} from "react-icons/fi";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  /* 🔍 Handle Search Submit */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${query}`);
    setQuery("");
    setShowSearch(false);
  };

  /* 🎯 Auto focus when search opens */
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">

        {/* LOGO */}
        <Link
  to="/"
  className="
    text-2xl
    font-bold
    tracking-wide
    bg-gradient-to-r
    from-pink-500
    to-purple-400
    bg-clip-text
    text-transparent
  "
>
  Beauty-Co
</Link>

        {/* MAIN MENU */}
        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase">
          <Link to="/lips" className="hover:underline">Lips</Link>
          <Link to="/eyes" className="hover:underline">Eyes</Link>
          <Link to="/face" className="hover:underline">Face</Link>
          <Link to="/nails" className="hover:underline">Nails</Link>
          <Link to="/skin" className="hover:underline">Skin</Link>
          <Link to="/gifting" className="hover:underline">Gifting</Link>
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 text-xl relative">

          {/* 🔍 SEARCH */}
          {/* {showSearch ? (
            <form
              onSubmit={handleSearch}
              className="
                absolute
                right-0
                top-10
                sm:top-12
                bg-white
                border
                rounded
                shadow-md
                flex
                items-center
                px-2
                py-1
                w-64
              "
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-2 py-1 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setQuery("");
                }}
                className="text-lg px-1"
              >
                <FiX />
              </button>
            </form>
          ) : (
            <button
              aria-label="Search"
              onClick={() => setShowSearch(true)}
            >
              <FiSearch />
            </button>
          )} */}

          {/* ❤️ WISHLIST */}
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <FiHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* 🛒 CART */}
          <Link to="/cart" aria-label="Cart" className="relative">
            <FiShoppingBag />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* 👤 PROFILE */}
          <Link to="/profile" aria-label="Profile">
            <FiUser />
          </Link>
        </div>
      </div>
    </header>
  );
}

