import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useMain } from "../context/MainContext";

const Orders = () => {
  const { user } = useMain();

  if (!user) {
    return <p className="p-6 text-center text-xl">Please log in to view your orders.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Orders</h1>

        {user.orders.length > 0 ? (
          <div className="space-y-6">
            {user.orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                <p className="text-gray-600">Total Items: {order.items.length}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Delivery Time:</span> Expected in 7 days
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Delivery Address:</span> {order.address}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="border p-3 rounded-lg flex flex-col items-center">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                      <p className="text-sm font-semibold mt-2">{item.name}</p>
                      <p className="text-sm text-gray-600">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl">You have not placed any orders yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
