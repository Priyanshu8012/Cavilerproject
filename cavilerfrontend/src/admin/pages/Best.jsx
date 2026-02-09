import React, { useState, useEffect } from "react";
import { FaUpload, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL =  import.meta.env.VITE_API_URL; // Change if backend is on a different port

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    preview: null,
  });

  // ✅ Fetch Products from Backend
  useEffect(() => {
    axios.get(`${API_URL}/bestsellingproducts`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file, preview: URL.createObjectURL(file) });
    }
  };

  // ✅ Add Product to Backend
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      await axios.post(`${API_URL}/bestsellingproducts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");
      setNewProduct({ name: "", price: "", image: null, preview: null });

      // Refresh products list
      const { data } = await axios.get(`${API_URL}/bestsellingproducts`);
      setProducts(data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product!");
    }
  };

  // ✅ Delete Product from Backend
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/bestsellingproducts/${id}`);
      alert("✅ Product deleted successfully!");

      // Refresh products list
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Failed to delete product!");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-10 drop-shadow-lg">
        Best Selling Products
      </h1>

      {/* Input Section */}
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="number"
          placeholder="Enter price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <label className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white cursor-pointer hover:border-orange-500 transition">
          <FaUpload className="text-orange-400 text-xl" />
          <span className="text-gray-300">Upload Product Image</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {newProduct.preview && <img src={newProduct.preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-3" />}

        <button
          onClick={handleAddProduct}
          className="flex items-center gap-3 px-6 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition shadow-md"
        >
          <FaPlus className="text-xl" /> Add Product
        </button>
      </div>

      {/* Display Added Products */}
      <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 text-center relative">
            <img src={`${API_URL}${product.image}`} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />
            <h3 className="text-lg font-bold text-orange-400">{product.name}</h3>
            <p className="text-gray-300">${product.price}</p>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-700 transition"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;

