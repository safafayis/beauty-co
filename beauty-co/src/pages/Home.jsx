// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Home() {
//   const navigate = useNavigate();

//   /* ================= BRAND DATA ================= */
//   const brands = [
//     { name: "Maybelline", logo: "https://i.pinimg.com/736x/8d/a5/4c/8da54c8ca33c86c76afc51decc0668d7.jpg" },
//     { name: "Lakme", logo: "https://i.pinimg.com/1200x/ab/81/e0/ab81e0037cdcbcd042d1e379e537c367.jpg" },
//     { name: "Huda Beauty", logo: "https://i.pinimg.com/736x/06/ed/df/06eddf42890f26799716108da468439f.jpg" },
//     { name: "MAC", logo: "https://i.pinimg.com/1200x/ac/0f/4d/ac0f4df37c2f387ffa3f43d3a82dae20.jpg" },
//     { name: "NYX", logo: "https://i.pinimg.com/1200x/bb/b1/84/bbb18498ab3d07ebf97c8d53dc8a0426.jpg" },
//     { name: "L'Oréal", logo: "https://i.pinimg.com/736x/45/67/f8/4567f868849fbb881f47bd3b5b30a7d5.jpg" }
//   ];

//   /* ================= STATES ================= */
//   const [featured, setFeatured] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   const hasFetched = useRef(false);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     axios.get("http://localhost:3000/products").then((res) => {
//       const data = res.data;

//       // ⭐ One product per category (Bestsellers)
//       const oneFromEachCategory = Object.values(data).map((category) => {
//         const items = Object.values(category).flat();
//         return items[0];
//       });
//       setFeatured(oneFromEachCategory);

//       // 🔍 Flatten all products (for search)
//       const flatProducts = Object.values(data)
//         .flatMap((cat) => Object.values(cat).flat());

//       setAllProducts(flatProducts);
//     });
//   }, []);

//   /* ================= SEARCH FILTER ================= */
//   const filteredProducts = allProducts.filter((p) =>
//     `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="w-full">

//       {/* ================= HERO ================= */}
//       <section className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
//         <img
//           src="https://i.pinimg.com/1200x/d7/12/81/d7128160867b0a2dbd61dd7183e2b097.jpg"
//           alt="hero"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/30" />

//         <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-24 text-white max-w-xl">
//           <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-4 leading-tight">
//             Beauty that speaks <br /> confidence
//           </h1>
//           <p className="text-sm sm:text-base opacity-90 mb-6">
//             Discover premium makeup essentials curated for every skin tone.
//           </p>
//           <Link
//             to="/shop"
//             className="inline-block bg-white text-black px-8 py-3 text-sm uppercase hover:bg-black hover:text-white transition"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </section>

//       {/* ================= SEARCH BAR ================= */}
//       <section className="px-6 sm:px-10 lg:px-24 py-10 bg-[#F9F7F3]">
//         <input
//           type="text"
//           placeholder="Search products or brands..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="
//             w-full
//             sm:w-2/3
//             lg:w-1/2
//             px-4
//             py-3
//             border
//             rounded-lg
//             focus:outline-none
//             focus:ring-1
//             focus:ring-pink-500
//           "
//         />
//       </section>

//       {/* ================= SEARCH RESULTS ================= */}
//       {search && (
//         <section className="px-6 sm:px-10 lg:px-24 pb-16 bg-[#F9F7F3]">
//           <h2 className="text-xl font-medium mb-6">
//             Search Results
//           </h2>

//           {filteredProducts.length === 0 ? (
//             <p className="text-gray-500">No products found</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {filteredProducts.map((p) => (
//                 <div
//                   key={`${p.id}-${p.brand}`}
//                   onClick={() => navigate(`/product/${p.id}`)}
//                   className="bg-white p-4 border rounded hover:shadow-md transition cursor-pointer"
//                 >
//                   <div className="h-36 sm:h-40 mb-4 flex items-center justify-center bg-gray-100">
//                     <img src={p.img} alt={p.name} className="h-full object-contain" />
//                   </div>
//                   <h4 className="text-sm mb-1 line-clamp-2">{p.name}</h4>
//                   <p className="text-xs text-gray-500 mb-2">{p.brand}</p>
//                   <p className="font-medium">₹{p.price}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       )}

//       {/* ================= BESTSELLERS ================= */}
//       {!search && (
//         <section className="px-6 sm:px-10 lg:px-24 py-16 bg-[#F9F7F3]">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-medium">Bestsellers</h2>
//             <Link to="/shop" className="text-sm underline">
//               View All
//             </Link>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {featured.map((i) => (
//               <div
//                 key={i.id}
//                 onClick={() => navigate(`/product/${i.id}`)}
//                 className="bg-white p-4 border rounded hover:shadow-md transition cursor-pointer"
//               >
//                 <div className="h-36 sm:h-40 mb-4 flex items-center justify-center bg-gray-100">
//                   <img src={i.img} alt={i.name} className="h-full object-contain" />
//                 </div>
//                 <h4 className="text-sm mb-1 line-clamp-2">{i.name}</h4>
//                 <p className="text-xs text-gray-500 mb-2">{i.brand}</p>
//                 <p className="font-medium">₹{i.price}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ================= BRANDS ================= */}
//       <section className="px-6 sm:px-10 lg:px-24 py-16">
//         <h2 className="text-2xl font-medium mb-8">
//           Brands You’ll Love
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
//           {brands.map((brand) => (
//             <div
//               key={brand.name}
//               className="border rounded-lg bg-white h-20 sm:h-24 lg:h-28 hover:shadow-md transition"
//             >
//               <img
//                 src={brand.logo}
//                 alt={brand.name}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");

  const hasFetched = useRef(false);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    axios.get("http://localhost:3000/products").then((res) => {
      const data = res.data;

      // 🔹 Flatten all products
      const flatProducts = Object.values(data).flatMap((cat) =>
        Object.values(cat).flat()
      );

      // ⭐ Bestsellers (1 per category)
      const bestsellers = Object.values(data).map((category) => {
        const items = Object.values(category).flat();
        return items[0];
      });

      // 🔥 Offer Products (Price based)
      const offerProducts = flatProducts
        .filter((p) => p.price < 1200)
        .slice(0, 6);

      setFeatured(bestsellers);
      setOffers(offerProducts);
      setAllProducts(flatProducts);
    });
  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredProducts = allProducts.filter((p) =>
    `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
  
  {/* 🎥 BACKGROUND VIDEO */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="hero.mp4" // 🔁 replace with your video URL
    autoPlay
    loop
    muted
    playsInline
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40" />

  {/* CONTENT */}
  <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-24 text-white max-w-xl">
    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-4">
      Beauty that speaks <br /> confidence
    </h1>

    <p className="text-sm sm:text-base mb-6 opacity-90">
      Discover premium makeup essentials curated for you.
    </p>

    <Link
      to="/face"
      className="
        inline-block
        bg-white
        text-black
        px-8
        py-3
        text-sm
        uppercase
        hover:bg-black
        hover:text-white
        transition
      "
    >
      Shop Now
    </Link>
  </div>
</section>


      {/* ================= SEARCH BAR ================= */}
      <section className="px-6 sm:px-10 lg:px-24 py-10 bg-[#F9F7F3]">
        <input
          type="text"
          placeholder="Search products or brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            sm:w-2/3
            lg:w-1/2
            px-4
            py-3
            border
            rounded-lg
            focus:outline-none
            focus:ring-1
            focus:ring-pink-500
          "
        />
      </section>

      {/* ================= SEARCH RESULTS ================= */}
      {search && (
        <section className="px-6 sm:px-10 lg:px-24 pb-16 bg-[#F9F7F3]">
          <h2 className="text-xl font-medium mb-6">Search Results</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white p-4 border rounded hover:shadow-md cursor-pointer"
              >
                <img src={p.img} alt={p.name} className="h-40 mx-auto object-contain" />
                <h4 className="text-sm mt-2 line-clamp-2">{p.name}</h4>
                <p className="text-xs text-gray-500">{p.brand}</p>
                <p className="font-medium">₹{p.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= OFFERS / SALES ================= */}
      {!search && (
  <section className="px-6 sm:px-10 lg:px-24 py-16 bg-[#FFF1F2]">
    
    {/* TITLE */}
    <h2 className="text-2xl font-medium mb-8 text-pink-700">
      Special Offers
    </h2>

    {/* BANNER */}
    <div className="relative overflow-hidden rounded-xl bg-pink-600 text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
      
      {/* TEXT */}
      <div className="max-w-lg">
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4">
          Flat 20% OFF on Best Sellers
        </h3>

        <p className="text-sm sm:text-base mb-6 opacity-90">
          Grab your favorite beauty essentials at exclusive sale prices.
          Limited time only!
        </p>

        <button
          onClick={() => navigate("/sales")}
          className="
            inline-block
            bg-white
            text-pink-600
            px-8
            py-3
            text-sm
            font-semibold
            uppercase
            rounded
            hover:bg-black
            hover:text-white
            transition
          "
        >
          View All Sales
        </button>
      </div>

      {/* OPTIONAL IMAGE */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/000/178/023/original/vector-modern-sale-and-promotion-banner-design-template.jpg"
        alt="Sale Banner"
        className="hidden md:block w-64 object-contain"
      />
    </div>
  </section>
)}


      {/* ================= BESTSELLERS ================= */}
      {!search && (
        <section className="px-6 sm:px-10 lg:px-24 py-16 bg-[#F9F7F3]">
          <h2 className="text-2xl font-medium mb-8">Bestsellers</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {featured.map((i) => (
              <div
                key={i.id}
                onClick={() => navigate(`/product/${i.id}`)}
                className="bg-white p-4 border rounded hover:shadow-md cursor-pointer"
              >
                <img src={i.img} alt={i.name} className="h-40 mx-auto object-contain" />
                <h4 className="text-sm mt-2 line-clamp-2">{i.name}</h4>
                <p className="text-xs text-gray-500">{i.brand}</p>
                <p className="font-medium">₹{i.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
