// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// // Create Context
// const Context = createContext();

// // Context Provider Component
// export const ContextProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [user, setUser] = useState(() => {
//     // Initialize user from localStorage
//     return JSON.parse(localStorage.getItem("user")) || null;
//   });

//   // Fetch Products from db.json on Component Mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/products");
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Helper function to update user (localStorage + Context)
//   const updateUser = async (updatedUser) => {
//     try {
//       await axios.patch(`http://localhost:5000/users/${user.id}`, updatedUser);
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     } catch (error) {
//       console.error("Error updating user:", error);
//       toast.error("Something went wrong!");
//     }
//   };

//   // Add to Cart Function
//   const addToCart = async (product, navigate) => {
//     if (!user) {
//       toast.error("Please login to add products to cart");
//       return;
//     }

//     const existingProduct = user.cart.find((item) => item.id === product.id);
//     const updatedCart = existingProduct
//       ? user.cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       : [...user.cart, { ...product, quantity: 1 }];

//     await updateUser({ ...user, cart: updatedCart });
//     toast.success("Added to cart!");
//     if (navigate) navigate("/cart");
//   };

//   // Update Cart (Increase, Decrease, Remove Items)
//   const updateCart = async (productId, action) => {
//     if (!user) return;

//     let updatedCart = user.cart.map((item) => {
//       if (item.id === productId) {
//         if (action === "increase") {
//           return { ...item, quantity: item.quantity + 1 };
//         } else if (action === "decrease" && item.quantity > 1) {
//           return { ...item, quantity: item.quantity - 1 };
//         }
//       }
//       return item;
//     });

//     if (action === "decrease") {
//       updatedCart = updatedCart.filter((item) => item.quantity > 0);
//     } else if (action === "remove") {
//       updatedCart = updatedCart.filter((item) => item.id !== productId);
//     }

//     await updateUser({ ...user, cart: updatedCart });
//     toast.success("Cart updated!");
//   };

//   // Place Order Function
//   const placeOrder = async (navigate) => {
//     if (!user || user.cart.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     const newOrder = { id: Date.now(), items: user.cart };
//     const updatedUser = {
//       ...user,
//       orders: [...user.orders, newOrder],
//       cart: [],
//     };

//     await updateUser(updatedUser);
//     toast.success("Order placed successfully!");
//     navigate("/payment");
//   };

//   // Logout Function
//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     toast.success("Logged out successfully!");
//   };

//   return (
//     <Context.Provider
//       value={{
//         products,
//         user,
//         setUser,
//         addToCart,
//         updateCart,
//         placeOrder,
//         logout,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

// // Custom Hook to Access Context
// export const useMain = () => useContext(Context);


import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Create Context
const Context = createContext();

// Context Provider Component
export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Sync Context State with LocalStorage
  useEffect(() => {
    const syncUserWithStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };
    window.addEventListener("storage", syncUserWithStorage);
    return () => window.removeEventListener("storage", syncUserWithStorage);
  }, []);

  // Fetch Products from db.json on Component Mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Helper function to update user (localStorage + Context)
  const updateUser = async (updatedUser) => {
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Something went wrong!");
    }
  };
  

  // Add to Cart Function
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
  
    const existingProduct = user.cart.find((item) => item.id === product.id);
    const updatedCart = existingProduct
      ? user.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...user.cart, { ...product, quantity: 1 }];
  
    await updateUser({ ...user, cart: updatedCart }); // ✅ Ensures state update
    toast.success("Added to cart!");
  };
  // Update Cart (Increase, Decrease, Remove Items)
  const updateCart = async (productId, action) => {
    if (!user) return;

    let updatedCart = user.cart.map((item) => {
      if (item.id === productId) {
        if (action === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    if (action === "decrease") {
      updatedCart = updatedCart.filter((item) => item.quantity > 0);
    } else if (action === "remove") {
      updatedCart = updatedCart.filter((item) => item.id !== productId);
    }

    await updateUser({ ...user, cart: updatedCart });
    toast.success("Cart updated!");
  };

  // Place Order Function
  const placeOrder = async (navigate) => {
    if (!user || user.cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const newOrder = { id: Date.now(), items: user.cart };
    const updatedUser = {
      ...user,
      orders: [...user.orders, newOrder],
      cart: [],
    };

    await updateUser(updatedUser);
    toast.success("Order placed successfully!");
    navigate("/payment");
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <Context.Provider
      value={{
        products,
        user,
        setUser,
        addToCart,
        updateCart,
        placeOrder,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom Hook to Access Context
export const useMain = () => useContext(Context);
