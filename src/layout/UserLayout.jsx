
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/common/Navbar";

// export default function UserLayout() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }



import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/common/Navbar";

export default function UserLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
