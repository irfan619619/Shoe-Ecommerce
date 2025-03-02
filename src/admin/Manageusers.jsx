import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './component/AdminNavbar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'admin') {
      navigate('/');
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const toggleBlockUser = async (id, isBlocked) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, { blocked: !isBlocked });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Manage Users</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">User List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-lg rounded-lg p-6 text-center transition hover:shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className={`mt-2 text-sm font-medium ${user.blocked ? 'text-red-500' : 'text-green-500'}`}>
                {user.blocked ? 'Blocked' : 'Active'}
              </p>
              <div className="mt-4 flex justify-center space-x-3">
              <button 
                  onClick={() => toggleBlockUser(user.id, user.blocked)} 
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                >
                  {user.blocked ? 'Unblock' : 'Block'}
                </button>
                <button onClick={() => handleDeleteUser(user.id)} 
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg">
                  Delete
                </button>
              </div>
              {user.orders && user.orders.length > 0 && (
                <div className="mt-6 text-left border-t pt-4">
                  <h4 className="text-md font-semibold text-gray-800">Order Details:</h4>
                  {user.orders.map((order, orderIndex) => (
                    <div key={orderIndex} className="mt-3 border p-4 rounded bg-gray-50 shadow-sm">
                      <h5 className="font-medium text-gray-700">Order {orderIndex + 1}:</h5>
                      <ul className="text-sm space-y-2 mt-2">
                        {order.items && order.items.length > 0 ? (
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
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
