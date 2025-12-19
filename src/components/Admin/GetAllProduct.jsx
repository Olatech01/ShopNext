"use client"
import React, { useState, useEffect } from 'react';
import { X, Loader2, RefreshCw } from 'lucide-react';

const GetAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const userId = localStorage.getItem('token');
      if (!userId) {
        setError('Please login to continue');
        return;
      }

      const response = await fetch('https://e-backend-1xjt.onrender.com/api/getProducts', {
        method: 'GET',
        headers: {
          Authorization: userId,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeletingId(productId);

      const userId = localStorage.getItem('token');

      const response = await fetch(`https://e-backend-1xjt.onrender.com/api/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: userId,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete product');
      }

      setProducts(products.filter(product => product._id !== productId));

    } catch (err) {
      alert(err.message || 'An error occurred while deleting the product');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-gray-600" size={40} />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-800">All Products List</h2>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-[100px_1fr_200px_150px_100px] gap-4 px-6 py-3">
              <div className="text-sm font-medium text-gray-700">Image</div>
              <div className="text-sm font-medium text-gray-700">Name</div>
              <div className="text-sm font-medium text-gray-700">Category</div>
              <div className="text-sm font-medium text-gray-700">Price</div>
              <div className="text-sm font-medium text-gray-700 text-center">Action</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[100px_1fr_200px_150px_100px] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition"
              >
                {/* Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`https://e-backend-1xjt.onrender.com${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/laptop.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="text-gray-800">{product.name}</div>

                {/* Category */}
                <div className="text-gray-600">{product.category}</div>

                {/* Price */}
                <div className="text-gray-800 font-medium">
                  ${product.price}
                </div>

                {/* Action */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="text-gray-600 hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === product._id ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <X size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Count */}
      {products.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Total Products: {products.length}
        </div>
      )}
    </div>
  );
};

export default GetAllProduct;