import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  let navigate = useNavigate();

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-6 shadow-lg flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Panel</h2>
      <ul className="space-y-4 flex-1">
        <li className="cursor-pointer hover:bg-blue-700 p-3 rounded-lg text-lg transition duration-300" onClick={() => navigate('/adminhome')}>
          🏠 Dashboard
        </li>
        <li className="cursor-pointer hover:bg-blue-700 p-3 rounded-lg text-lg transition duration-300" onClick={() => navigate('/manageproducts')}>
          📦 Manage Products
        </li>
        <li className="cursor-pointer hover:bg-blue-700 p-3 rounded-lg text-lg transition duration-300" onClick={() => navigate('/manageusers')}>
          👥 Manage Users
        </li>
        <li className="cursor-pointer hover:bg-blue-700 p-3 rounded-lg text-lg transition duration-300" onClick={() => navigate('/adminorders')}>
          📜 Manage Orders
        </li>
      </ul>
      <button 
        className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-lg transition duration-300"
        onClick={() => {
          localStorage.removeItem('user');
          navigate('/');
        }}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;