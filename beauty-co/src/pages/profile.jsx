// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import { WishlistContext } from "../context/WishlistContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FiEdit2 } from "react-icons/fi";
// // import { useAuth } from "../context/AuthContext";

// export default function Profile() {
//   const { user, logout } = useContext(CartContext);
//   // const { user, logout } = useAuth();
//   const { wishlist } = useContext(WishlistContext);
//   const navigate = useNavigate();

//   const [isEditing, setIsEditing] = useState(false);

//   const [address, setAddress] = useState({
//     fullName: "",
//     phoneNumber: "",
//     pincode: "",
//     state: "",
//     city: "",
//     houseNo: "",
//     roadName: "",
//     addressType: "home"
//   });

//   useEffect(() => {
//     if (user?.address) {
//       setAddress(user.address);
//     }
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
//         ...user,
//         address
//       });
//       setIsEditing(false);
//       alert("Address saved successfully");
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
//   if (!user) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-[#F9F7F3]">
//         <div className="bg-white p-8 rounded-xl shadow text-center">
//           <h2 className="text-xl font-semibold mb-3">You are not logged in</h2>
//           <button
//             onClick={() => navigate("/login")}
//             className="px-6 py-2 bg-black text-white rounded"
//           >
//             Login
//           </button>
//         </div>
//       </section>
//     );
//   }

  
//   return (
//     <section className="px-4 sm:px-10 md:px-24 py-12 bg-[#F9F7F3] min-h-screen">
//       <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

//       <div className="grid md:grid-cols-3 gap-8">
       
//         <div className="bg-white rounded-xl p-6 shadow-sm">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center text-xl font-semibold">
//               {user.name?.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <h2 className="font-medium text-lg">{user.name}</h2>
//               <p className="text-sm text-gray-500">{user.email}</p>
//             </div>
//           </div>

//           <hr className="my-6" />

//           <div className="space-y-4 text-sm">
//             <button onClick={() => navigate("/orders")} className="block w-full text-left">
//               My Orders
//             </button>
//             <button onClick={() => navigate("/wishlist")} className="block w-full text-left">
//               Wishlist ({wishlist.length})
//             </button>
//             <button onClick={() => navigate("/cart")} className="block w-full text-left">
//               Cart
//             </button>
//             <button onClick={handleLogout} className="block w-full text-left text-red-500">
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="md:col-span-2 space-y-6">
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <h3 className="font-medium text-lg mb-4">Account Details</h3>
//             <div className="grid sm:grid-cols-2 gap-4 text-sm">
//               <p><span className="text-gray-500">Name:</span> {user.name}</p>
//               <p><span className="text-gray-500">Email:</span> {user.email}</p>
//               <p><span className="text-gray-500">Cart Items:</span> {user.cart?.length || 0}</p>
//               <p><span className="text-gray-500">Wishlist:</span> {wishlist.length}</p>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-medium text-lg">Address</h3>
//               {user.address && !isEditing && (
//                 <button onClick={() => setIsEditing(true)}>
//                   <FiEdit2 className="text-gray-600 hover:text-pink-600" />
//                 </button>
//               )}
//             </div>

//             {user.address && !isEditing ? (
//               <div className="text-sm space-y-2">
//                 <p>{user.address.fullName}</p>
//                 <p>{user.address.phoneNumber}</p>
//                 <p>
//                   {user.address.houseNo}, {user.address.roadName}
//                 </p>
//                 <p>
//                   {user.address.city}, {user.address.state} - {user.address.pincode}
//                 </p>
//                 <p className="capitalize">Type: {user.address.addressType}</p>
//               </div>
//             ) : (
              
//               <form
//                 className="space-y-4"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSubmit();
//                 }}
//               >
//                 {[
//                   ["fullName", "Full Name"],
//                   ["phoneNumber", "Phone Number"],
//                   ["pincode", "Pincode"],
//                   ["state", "State"],
//                   ["city", "City"],
//                   ["houseNo", "House No"],
//                   ["roadName", "Road Name"]
//                 ].map(([name, placeholder]) => (
//                   <input
//                     key={name}
//                     name={name}
//                     value={address[name]}
//                     onChange={handleAddressChange}
//                     placeholder={placeholder}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 ))}

//                 <div className="flex gap-4">
//                   {["home", "work"].map(type => (
//                     <label key={type} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="addressType"
//                         value={type}
//                         checked={address.addressType === type}
//                         onChange={handleAddressChange}
//                       />
//                       {type}
//                     </label>
//                   ))}
//                 </div>

//                 <div className="flex gap-3">
//                   <button type="submit" className="px-6 py-2 bg-black text-white rounded">
//                     Save Address
//                   </button>
//                   {user.address && (
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(false)}
//                       className="px-6 py-2 border rounded"
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { useContext } from "react";

export default function Profile() {
  // ✅ FIX: user & logout MUST come from AuthContext
  const { user, logout } = useAuth();
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    state: "",
    city: "",
    houseNo: "",
    roadName: "",
    addressType: "home"
  });

  // Load address when user changes
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        address
      });

      // 🔁 sync updated address to auth user + localStorage
      const updatedUser = { ...user, address };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
      alert("Address saved successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // 🚫 NOT LOGGED IN UI
  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#F9F7F3]">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-3">
            You are not logged in
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-black text-white rounded"
          >
            Login
          </button>
        </div>
      </section>
    );
  }

  // ✅ PROFILE UI
  return (
    <section className="px-4 sm:px-10 md:px-24 py-12 bg-[#F9F7F3] min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center text-xl font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-medium text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <hr className="my-6" />

          <div className="space-y-4 text-sm">
            <button
              onClick={() => navigate("/orders")}
              className="block w-full text-left"
            >
              My Orders
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="block w-full text-left"
            >
              Wishlist ({wishlist.length})
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="block w-full text-left"
            >
              Cart
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2 space-y-6">
          {/* ACCOUNT DETAILS */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-medium text-lg mb-4">Account Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-gray-500">Name:</span> {user.name}
              </p>
              <p>
                <span className="text-gray-500">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-gray-500">Cart Items:</span>{" "}
                {user.cart?.length || 0}
              </p>
              <p>
                <span className="text-gray-500">Wishlist:</span>{" "}
                {wishlist.length}
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Address</h3>
              {user.address && !isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  <FiEdit2 className="text-gray-600 hover:text-pink-600" />
                </button>
              )}
            </div>

            {user.address && !isEditing ? (
              <div className="text-sm space-y-2">
                <p>{user.address.fullName}</p>
                <p>{user.address.phoneNumber}</p>
                <p>
                  {user.address.houseNo}, {user.address.roadName}
                </p>
                <p>
                  {user.address.city}, {user.address.state} -{" "}
                  {user.address.pincode}
                </p>
                <p className="capitalize">
                  Type: {user.address.addressType}
                </p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {[
                  ["fullName", "Full Name"],
                  ["phoneNumber", "Phone Number"],
                  ["pincode", "Pincode"],
                  ["state", "State"],
                  ["city", "City"],
                  ["houseNo", "House No"],
                  ["roadName", "Road Name"]
                ].map(([name, placeholder]) => (
                  <input
                    key={name}
                    name={name}
                    value={address[name]}
                    onChange={handleAddressChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                ))}

                <div className="flex gap-4">
                  {["home", "work"].map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="addressType"
                        value={type}
                        checked={address.addressType === type}
                        onChange={handleAddressChange}
                      />
                      {type}
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded"
                  >
                    Save Address
                  </button>

                  {user.address && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
