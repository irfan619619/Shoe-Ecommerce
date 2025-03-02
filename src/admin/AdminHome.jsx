import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './component/AdminNavbar';

const AdminHome = () => {
  let navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'admin') {
      navigate('/');
    }

    const fetchData = async () => {
      try {
        const [products, users] = await Promise.all([
          axios.get('http://localhost:5000/products'),
          axios.get('http://localhost:5000/users')
        ]);

        let totalOrders = 0;
        let totalRevenue = 0;
    
        users.data.forEach(user => {
          if (user.orders) {
            totalOrders += user.orders.length;
    
            user.orders.forEach(order => {
              if (order.items) {
                order.items.forEach(item => {
                  totalRevenue += (item.price || 0) * (item.quantity || 0);
                });
              }
            });
          }
        });
        
        setStats({
          totalProducts: products.data.length,
          totalUsers: users.data.length,
          totalOrders: totalOrders,
          totalRevenue: totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.totalOrders}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
            <p className="text-3xl font-bold text-red-600">${stats.totalRevenue}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
