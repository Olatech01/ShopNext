"use client"
import React, { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

const sizes = ["S", "M", "L", "XL", "XXL"];

const AddProducts = () => {
  const fileInputs = useRef([]);
  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    stock: "",
    bestseller: false
  });

  const handleImageClick = (index) => {
    fileInputs.current[index].click();
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload only image files');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const updatedImages = [...images];
    const updatedFiles = [...imageFiles];

    updatedImages[index] = URL.createObjectURL(file);
    updatedFiles[index] = file;

    setImages(updatedImages);
    setImageFiles(updatedFiles);
    setError("");
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name.trim()) {
      setError("Product name is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Product description is required");
      return;
    }

    if (!formData.price || formData.price <= 0) {
      setError("Please enter a valid price");
      return;
    }

    if (!formData.stock || formData.stock < 0) {
      setError("Please enter a valid stock quantity");
      return;
    }

    // Check if at least one image is uploaded
    const uploadedImages = imageFiles.filter(file => file !== null);
    if (uploadedImages.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    if (selectedSizes.length === 0) {
      setError("Please select at least one size");
      return;
    }

    try {
      setLoading(true);

      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('subCategory', formData.subCategory);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('bestseller', formData.bestseller);
      formDataToSend.append('sizes', JSON.stringify(selectedSizes));

      // Append all non-null images
      imageFiles.forEach((file) => {
        if (file) {
          formDataToSend.append('images', file);
        }
      });

      const userId = localStorage.getItem('token'); 
      console.log("Token: ", userId)
      if (!userId) {
        setError("Please login to continue");
        return;
      }

      // Make API call
      const response = await fetch('https://e-backend-1xjt.onrender.com/api/create', {
        method: 'POST',
        headers: {
          Authorization: userId
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      setSuccess("Product created successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "Men",
        subCategory: "Topwear",
        price: "",
        stock: "",
        bestseller: false
      });
      setImages([null, null, null, null]);
      setImageFiles([null, null, null, null]);
      setSelectedSizes([]);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      setError(err.message || "An error occurred while creating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Upload Images */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium">Upload Image</p>

          <div className="flex gap-3">
            {images.map((img, index) => (
              <div key={index}>
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputs.current[index] = el)}
                  onChange={(e) => handleImageChange(e, index)}
                  hidden
                />

                <div
                  onClick={() => handleImageClick(index)}
                  className="w-24 h-24 border border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-500 transition"
                >
                  {img ? (
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 text-xs">
                      <UploadCloud size={18} />
                      <span>Upload</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-5">
          <p className="mb-1 text-sm font-medium">Product name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-black"
          />
        </div>

        {/* Product Description */}
        <div className="mb-5">
          <p className="mb-1 text-sm font-medium">Product description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write content here"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none resize-none focus:border-black"
          />
        </div>

        {/* Category / Subcategory / Price */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium">Product category</p>
            <input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1 text-sm font-medium">Sub category</p>
            <input
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="w-32">
            <p className="mb-1 text-sm font-medium">Product Price</p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="25"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Stock Quantity */}
        <div className="mb-5">
          <p className="mb-1 text-sm font-medium">Stock Quantity</p>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-black"
          />
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium">Product Sizes</p>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-1 border rounded-md text-sm ${selectedSizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 border-gray-300"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            name="bestseller"
            checked={formData.bestseller}
            onChange={handleInputChange}
          />
          <label className="text-sm">Add to bestseller</label>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Creating...
            </>
          ) : (
            'ADD PRODUCT'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;