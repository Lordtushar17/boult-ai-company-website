import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Engine Testing', 'Automotive Safety', 'Defence', 'Custom Systems'];

  // Mock data - in production, fetch from API
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Engine Dynamometer Test Rig',
        category: 'Engine Testing',
        description: 'Advanced engine testing system with real-time monitoring and data acquisition capabilities.',
        image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        createdAt: '2025-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Automotive Safety Testing Rig',
        category: 'Automotive Safety',
        description: 'Comprehensive safety testing solution for passive and active automotive systems.',
        image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        createdAt: '2025-01-14',
        status: 'active'
      },
      {
        id: 3,
        name: 'Defence Component Tester',
        category: 'Defence',
        description: 'Critical testing apparatus designed for military applications with precision accuracy.',
        image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        createdAt: '2025-01-13',
        status: 'active'
      },
      {
        id: 4,
        name: 'Custom Industrial Testing System',
        category: 'Custom Systems',
        description: 'Tailored engineering solutions for unique industrial testing requirements.',
        image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        createdAt: '2025-01-12',
        status: 'inactive'
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleDelete = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDelete = () => {
    if (deleteModal.product) {
      setProducts(prev => prev.filter(p => p.id !== deleteModal.product!.id));
      setDeleteModal({ isOpen: false, product: null });
      
      // Log deletion
      console.log('Product deleted:', {
        productId: deleteModal.product.id,
        productName: deleteModal.product.name,
        timestamp: new Date().toISOString()
      });
    }
  };

  const toggleStatus = (productId: number) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
        : product
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
          Manage Products
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent font-roboto"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent font-roboto appearance-none bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-roboto font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-roboto font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-roboto font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-roboto font-semibold text-gray-700">Created</th>
                <th className="text-left py-3 px-4 font-roboto font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <p className="font-roboto font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-roboto rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleStatus(product.id)}
                      className={`px-2 py-1 text-xs font-roboto rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 font-roboto">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 font-roboto">No products found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 font-roboto mb-6">
              Are you sure you want to delete "{deleteModal.product?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, product: null })}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-roboto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-roboto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;