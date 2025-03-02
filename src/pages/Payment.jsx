import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMain } from "../context/MainContext";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";

const Payment = () => {
  const { user } = useMain();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    accountNumber: "",
    cvv: "",
    pin: "",
    address: "",
  });
  const [isPaid, setIsPaid] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  // Load animation from public folder
  useEffect(() => {
    fetch("/assets/Animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading animation", err));
  }, []);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentData.accountNumber || !paymentData.cvv || !paymentData.pin || !paymentData.address) {
      toast.error("Please fill in all payment details.");
      return;
    }

    setIsPaid(true);

    setTimeout(() => {
      toast.success("Payment successful!");
      navigate("/orders", { state: { orderedItems: user.cart } });
    }, 3000);
  };

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {!isPaid ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">Payment</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={paymentData.accountNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">CVV</label>
              <input
                type="password"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">PIN</label>
              <input
                type="password"
                name="pin"
                value={paymentData.pin}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <textarea
                name="address"
                value={paymentData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Pay Now
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center">
          {animationData ? (
            <Lottie options={animationOptions} height={200} width={200} />
          ) : (
            <p>Loading animation...</p>
          )}
          <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
        </div>
      )}
    </div>
  );
};

export default Payment;
