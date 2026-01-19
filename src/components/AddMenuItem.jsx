import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddMenuItem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const categories = [
    "Sarcastic Sips",
    "Fashionable Frappes",
    "Smelly Cat Smoothies",
    "Spotless Sandwiches & Salads",
    "Dinosaurs & Donuts",
    "How You Doin' Desserts",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "menuItem",
      new Blob([JSON.stringify(form)], { type: "application/json" })
    );
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item Added Successfully!");
      navigate("/menulist", { replace: true });
    } catch (error) {
      console.log(error);
      alert("Failed to Add Item!");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbe9d0] p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#3c1f0a] text-center mb-4">
          Add New Menu Item
        </h2>

        {/* Item Name */}
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-3 border rounded-md focus:ring"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded-md focus:ring"
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* Category */}
        <select
          className="w-full p-3 border rounded-md focus:ring"
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          type="file"
          required
          accept="image/*"
          className="w-full p-3 border rounded-md"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/menu-list")}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[#e27d60] hover:bg-[#d3614b] transition cursor-pointer text-white rounded-md"
          >
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
}
