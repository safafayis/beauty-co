import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

export default function 
Home() {
  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);
  const [offers, setOffers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    axios.get("http://localhost:3000/products").then((res) => {
      const data = res.data;

      const flatProducts = Object.values(data).flatMap((cat) =>
        Object.values(cat).flat()
      );

      const bestsellers = Object.values(data).map((category) => {
        const items = Object.values(category).flat();
        return items[0];
      });

      const offerProducts = flatProducts
        .filter((p) => p.price < 1200)
        .slice(0, 6);

      setFeatured(bestsellers);
      setOffers(offerProducts);
      setAllProducts(flatProducts);
    });
  }, []);

  const filteredProducts = allProducts.filter((p) =>
    `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">


      <section className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
  
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="hero.mp4" 
    autoPlay
    loop
    muted
    playsInline
  />

  <div className="absolute inset-0 bg-black/40" />

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

      {!search && (
  <section className="px-6 sm:px-10 lg:px-24 py-16 bg-[#FFF1F2]">
    
    <h2 className="text-2xl font-medium mb-8 text-pink-700">
      Special Offers
    </h2>

    <div className="relative overflow-hidden rounded-xl bg-pink-600 text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
      
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

      <img
        src="https://static.vecteezy.com/system/resources/previews/000/178/023/original/vector-modern-sale-and-promotion-banner-design-template.jpg"
        alt="Sale Banner"
        className="hidden md:block w-64 object-contain"
      />
    </div>
  </section>
)}


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
