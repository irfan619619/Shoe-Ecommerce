import React from "react";
import { useMain } from "../context/MainContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { user, placeOrder, updateCart } = useMain();
  const navigate=useNavigate()

  if (!user) {
    return <p className="p-6 text-center text-xl">Please log in</p>;
  }

  const totalPrice = user.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div><Navbar/>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {user.cart.length > 0 ? (
        <div>
          <div className="space-y-4">
            {user.cart.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateCart(item.id, "decrease")}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateCart(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  onClick={() => updateCart(item.id, "remove")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-bold">
            Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={()=>placeOrder(navigate)}
          >
            Place Order
          </button>
        </div>
      ) : (
        <p className="text-xl">Your cart is empty.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default Cart;
