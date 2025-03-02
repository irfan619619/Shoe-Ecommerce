import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../context/MainContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Products = () => {
  const { products, addToCart } = useMain();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    closeModal();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-blue-950 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-white">Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          className="w-80 p-2 mb-6 border border-gray-500 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => openModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2"
                />
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-blue-950 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="text-gray-600">{selectedProduct.description}</p>
            <p className="text-xl font-semibold mt-2">${selectedProduct.price}</p>
            
            <p className="text-sm text-gray-500 mt-2">Category: {selectedProduct.category}</p>

            <p className={`text-sm mt-1 ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-green-600'}`}>
              {selectedProduct.stock > 0 ? 'In Stock' : 'In Stock'}
            </p>

            <p className="text-sm text-gray-500">Brand: {selectedProduct.brand || 'NIKE'}</p>

            <p className="text-sm text-gray-500">Material: {selectedProduct.material || 'CUSHIONED AND SOFT'}</p>

            <p className="text-sm text-yellow-500">Rating: {'⭐'.repeat(selectedProduct.rating || 4)}</p>

            {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-semibold mb-1">Specifications:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedProduct.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;
