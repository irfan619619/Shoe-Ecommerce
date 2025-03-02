// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart } from "lucide-react";
// import { useMain } from "../context/MainContext"; // Import Context

// const Navbar = () => {
//   const { user, logout } = useMain(); // Access user & logout from context
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold">Kicks Vibe</h1>

//       <div className="flex items-center gap-6">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/about" className="hover:underline">About</Link>
//         <Link to="/products" className="hover:underline">Products</Link>
//         {user && <Link to="/orders" className="hover:underline">Orders</Link>}

//         {/* Cart Icon with Dynamic Count */}
//         <Link to="/cart" className="relative flex items-center">
//           <ShoppingCart className="w-6 h-6" />
//           {user?.cart?.length > 0 && (
//             <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
//               {user.cart.length}
//             </span>
//           )}
//         </Link>

//         {/* Authentication Logic */}
//         {user ? (
//           <>
//             <span className="text-lg">Welcome, {user.name}!</span>
//             <button
//               className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link
//             to="/login"
//             className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/Useauth";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold">Shoe Store</Link>

//       <div className="space-x-4">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/products" className="hover:underline">Products</Link>

//         {user ? (
//           <>
//             <span className="font-semibold">{user.email}</span>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart } from "lucide-react";
// import { useAuth } from "../hooks/Useauth"; // Custom authentication hook

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);

//   // Update cart count whenever user.cart changes
//   useEffect(() => {
//     if (user?.cart) {
//       setCartCount(user.cart.length);
//     } else {
//       setCartCount(0);
//     }
//   }, [user?.cart]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold">Kicks Vibe</Link>

//       <div className="flex items-center gap-6">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/about" className="hover:underline">About</Link>
//         <Link to="/products" className="hover:underline">Products</Link>
//         {user && <Link to="/orders" className="hover:underline">Orders</Link>}

//         {/* Cart Icon with Dynamic Count */}
//         <Link to="/cart" className="relative flex items-center">
//           <ShoppingCart className="w-6 h-6" />
//           {cartCount > 0 && (
//             <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
//               {cartCount}
//             </span>
//           )}
//         </Link>

//         {/* Authentication Logic */}
//         {user ? (
//           <>
//             <span className="text-lg">Welcome, {user.name}!</span>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link
//             to="/login"
//             className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../hooks/Useauth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(user?.cart?.length || 0);

  useEffect(() => {
    const handleAuthChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user")) || null;
      setCartCount(updatedUser?.cart?.length || 0);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Kicks Vibe</Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        {user && <Link to="/orders" className="hover:underline">Orders</Link>}

        <Link to="/cart" className="relative flex items-center">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="text-lg">Welcome, {user.name}!</span>
            <button
              onClick={handleLogout}
              className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
