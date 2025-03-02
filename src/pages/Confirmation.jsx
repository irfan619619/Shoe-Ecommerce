import React, { useEffect, useState } from "react";
import { useMain } from "../context/MainContext";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { user } = useMain();
  const navigate = useNavigate();
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    if (user && Array.isArray(user.orders)) {
      const lastOrder = user.orders.length > 0 ? user.orders[user.orders.length - 1] : [];
      setOrderedItems(Array.isArray(lastOrder) ? lastOrder : []);
    }
  }, [user]);

  const totalPrice = orderedItems.length > 0 
    ? orderedItems.reduce((total, item) => total + item.price * item.quantity, 0) 
    : 0;

  const handleConfirm = () => {
    alert("Order Confirmed!");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Order Confirmation</h1>

      <div className="space-y-4">
        {orderedItems.length > 0 ? (
          orderedItems.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your order history is empty.</p>
        )}
      </div>

      <div className="mt-6 text-xl font-bold">
        Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={handleConfirm}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Confirmation;
