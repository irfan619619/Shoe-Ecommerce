import { useState, useEffect } from "react";

const notifyAuthChange = () => {
  window.dispatchEvent(new Event("authChange"));
};

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null; // No guest users
  });

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    notifyAuthChange();
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    notifyAuthChange();
  };

  const updateCart = (newCart) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, cart: newCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      notifyAuthChange(); // 🔥 Ensures Navbar updates immediately
      return updatedUser;
    });
  };

  return { user, login, logout, updateCart };
};
