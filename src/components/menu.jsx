import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";


import chandler from "../assets/chandler.jpg";
import rachel from "../assets/rachel.jpg";
import phoebe from "../assets/phoebe.jpg";
import monica from "../assets/monica.jpg";
import ross from "../assets/ross.jpg";
import joey from "../assets/joey.jpg";

const menuCategories = [
  { name: "Sarcastic Sips", img: chandler },
  { name: "Fashionable Frappes", img: rachel },
  { name: "Smelly Cat Smoothies", img: phoebe },
  { name: "Spotless Sandwiches & Salads", img: monica },
  { name: "Dinosaurs & Donuts", img: ross },
  { name: "How You Doin' Desserts", img: joey },
];

export default function menu() {

  const { addToCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const [showAccount, setShowAccount] = useState(false);

  const username = localStorage.getItem("username");
  const firstName = username ? username.split(/[_\s]/)[0] : "User";

  const [activeCategory, setActiveCategory] = useState(menuCategories[0].name);
  const [menuItems, setMenuItems] = useState([]);

  // 🔹 Fetch menu items from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/menu") // change if needed
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (item) => {
  setCartCount((prev) => prev + 1);
  setCartTotal((prev) => prev + item.price);
};


  // 🔹 Filter items by category
  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="min-h-screen p-6 pb-24 bg-gray-100">
      {/* 👤 Account Icon */}
    <div className="absolute top-6 right-6">
      <button
        onClick={() => setShowAccount(!showAccount)}
        className="w-11 h-11 rounded-full bg-purple-600 text-white font-bold text-lg shadow-lg cursor-pointer"
      >
        {firstName.charAt(0).toUpperCase()}
      </button>

      {showAccount && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl overflow-hidden z-50">
          
          <div className="px-4 py-3 border-b">
            <p className="text-sm text-gray-500">Hi</p>
            <p className="font-semibold text-gray-800">{firstName} 👋</p>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            📦 Orders
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login", { replace: true });
            }}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 cursor-pointer"
          >
            🚪 Logout
          </button>

        </div>
      )}
    </div>

      <h1 className="text-4xl font-extrabold mb-10 text-purple-600 text-center">
        Central Perk Delights
      </h1>

      {/* 🔸 Categories */}
      <div className="flex flex-wrap justify-center gap-11 mb-12">
        {menuCategories.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveCategory(item.name)}
            className={`flex flex-col items-center cursor-pointer 
              ${activeCategory === item.name ? "scale-110" : "opacity-70"}`}
          >
            <img
              src={item.img}
              alt={item.name}
              className={`w-28 h-28 object-cover rounded-full shadow-md border-4
                ${
                  activeCategory === item.name
                    ? "border-purple-600"
                    : "border-transparent"
                }`}
            />
            <h2 className="text-sm font-medium text-gray-800 mt-3 text-center w-28">
              {item.name}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔸 Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <img
                src={`http://localhost:8080/uploads/${item.imageUrl}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-500">₹{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-auto ml-72 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-3 py-3 rounded-lg text-sm font-medium transition"
              >
              Add
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No items available in this category ☕
          </p>
        )}
      </div>

      {/* 🔻 Bottom Checkout Bar */}
      {cartCount > 0 && (
  <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
    <span className="font-medium">
      {cartCount} item added | ₹{cartTotal}
    </span>

    <button
      onClick={() => navigate("/bill")}
      className="font-semibold underline cursor-pointer"
    >
      View Cart →
    </button>
  </div>
)}



    </div>
  );
}
