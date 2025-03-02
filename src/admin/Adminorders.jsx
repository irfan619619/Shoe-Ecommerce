import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './component/AdminNavbar';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'admin') {
      navigate('/');
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const extractedOrders = response.data.flatMap(user => 
        user.orders.map(order => ({ ...order, userId: user.id, userName: user.name, userEmail: user.email }))
      );
      setOrders(extractedOrders);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  const handleDeleteOrder = async (userId, orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const updatedOrders = response.data.orders.filter((_, index) => index !== orderId);
      await axios.patch(`http://localhost:5000/users/${userId}`, { orders: updatedOrders });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Manage Orders</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Order List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900">Order #{index + 1}</h3>
                <p className="text-gray-600 text-sm">Customer: {order.userName} ({order.userEmail})</p>
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-md font-semibold text-gray-800">Items:</h4>
                  <ul className="text-sm space-y-2 mt-2">
                    {order.items.length > 0 ? (
                      order.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-4 border-b pb-2">
                          <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg shadow-md" />
                          <span className="font-medium text-gray-900">{item.name} - ${item.price}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No items in this order</li>
                    )}
                  </ul>
                </div>
                <button 
                  onClick={() => handleDeleteOrder(order.userId, index)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                >
                  Delete Order
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;
