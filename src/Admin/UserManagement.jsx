// import { useState } from "react";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "Bella",
//       email: "bella@gmail.com",
//       role: "user",
//       blocked: false
//     },
//     {
//       id: 2,
//       name: "Sara",
//       email: "sara@gmail.com",
//       role: "user",
//       blocked: true
//     }
//   ]);

//   const toggleBlock = (id) => {
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id ? { ...user, blocked: !user.blocked } : user
//       )
//     );
//   };

//   return (
//     <div className="w-full">
//       <h1 className="text-xl sm:text-2xl font-bold mb-6">User Management</h1>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full min-w-[600px] border-collapse">
//           <thead>
//             <tr className="border-b text-left bg-gray-100 text-sm">
//               <th className="p-3">Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-b text-sm">
//                 <td className="p-3">{user.name}</td>
//                 <td>{user.email}</td>
//                 <td className="capitalize">{user.role}</td>
//                 <td
//                   className={
//                     user.blocked ? "text-red-600" : "text-green-600"
//                   }
//                 >
//                   {user.blocked ? "Blocked" : "Active"}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => toggleBlock(user.id)}
//                     className={`px-3 py-1 rounded text-white text-xs sm:text-sm ${
//                       user.blocked ? "bg-green-600" : "bg-red-500"
//                     }`}
//                   >
//                     {user.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleBlock = async (userId, currentStatus) => {
//     try {
//       await axios.patch(`http://localhost:3000/users/${userId}`, {
//         user: {
//           ...users.find((u) => u.id === userId).user,
//           blocked: !currentStatus
//         }
//       });

//       setUsers((prev) =>
//         prev.map((u) =>
//           u.id === userId
//             ? {
//                 ...u,
//                 user: { ...u.user, blocked: !currentStatus }
//               }
//             : u
//         )
//       );
//     } catch (err) {
//       alert("Failed to update user status");
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading users...</p>;
//   }

//   return (
//     <div className="w-full">
//       <h1 className="text-xl sm:text-2xl font-bold mb-6">User Management</h1>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full min-w-[600px] border-collapse">
//           <thead>
//             <tr className="border-b text-left bg-gray-100 text-sm">
//               <th className="p-3">Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="border-b text-sm">
//                 <td className="p-3">{u.user?.name}</td>
//                 <td>{u.user?.email}</td>
//                 <td className="capitalize">{u.user?.role || "user"}</td>
//                 <td
//                   className={
//                     u.user?.blocked ? "text-red-600" : "text-green-600"
//                   }
//                 >
//                   {u.user?.blocked ? "Blocked" : "Active"}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       toggleBlock(u.id, u.user?.blocked || false)
//                     }
//                     className={`px-3 py-1 rounded text-white text-xs sm:text-sm ${
//                       u.user?.blocked ? "bg-green-600" : "bg-red-500"
//                     }`}
//                   >
//                     {u.user?.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (userId, currentStatus) => {
    try {
      const currentUser = users.find((u) => u.id === userId);

      await axios.patch(`http://localhost:3000/users/${userId}`, {
        user: {
          ...currentUser.user,
          blocked: !currentStatus
        }
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                user: { ...u.user, blocked: !currentStatus }
              }
            : u
        )
      );
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm sm:text-base">
        Loading users...
      </p>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
        User Management
      </h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left text-xs sm:text-sm">
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b text-xs sm:text-sm hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">
                  {u.user?.name || "-"}
                </td>
                <td className="break-all">{u.user?.email}</td>
                <td className="capitalize">
                  {u.user?.role || "user"}
                </td>
                <td
                  className={
                    u.user?.blocked
                      ? "text-red-600 font-medium"
                      : "text-green-600 font-medium"
                  }
                >
                  {u.user?.blocked ? "Blocked" : "Active"}
                </td>
                <td className="text-center">
                  <button
                    onClick={() =>
                      toggleBlock(u.id, u.user?.blocked || false)
                    }
                    className={`px-3 py-1 rounded text-white text-xs sm:text-sm transition ${
                      u.user?.blocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {u.user?.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
