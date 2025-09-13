import React, { useState } from 'react';
import { Upload, X, Save, AlertCircle, CheckCircle } from 'lucide-react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    'Engine Testing',
    'Automotive Safety',
    'Defence',
    'Custom Systems'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMessage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select a valid image file.' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB.' });
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setMessage(null);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Validate form
      if (!formData.name.trim() || !formData.category || !formData.description.trim()) {
        throw new Error('Please fill in all required fields.');
      }

      if (!formData.image) {
        throw new Error('Please select an image for the product.');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, you would:
      // 1. Upload image to secure storage (AWS S3, Cloudinary, etc.)
      // 2. Send product data to backend API
      // 3. Store in database with proper validation and sanitization

      console.log('Product data:', {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image: formData.image?.name,
        timestamp: new Date().toISOString()
      });

      setMessage({ type: 'success', text: 'Product added successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        description: '',
        image: null
      });
      setImagePreview(null);

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add product. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-roboto font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-colors font-roboto"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-roboto font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-colors font-roboto"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-roboto font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-colors font-roboto resize-vertical"
              placeholder="Enter product description"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-roboto font-medium text-gray-700 mb-2">
              Product Image *
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F97316] transition-colors">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-roboto mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              )}
              <span className={`font-roboto text-sm ${
                message.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message.text}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#F97316] hover:bg-[#0A1F44] text-white py-3 px-4 rounded-lg font-roboto font-medium transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Product...
              </>
            ) : (
              <>
                <Save size={20} />
                Add Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;