import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MenuList() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);

  const handleAddItem = () => {
    navigate("/add-item");
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:8080/api/menu/${id}`);
    setMenuItems(menuItems.filter((item) => item.id !== id));
  } catch (err) {
    console.error("Error deleting menu item:", err);
  }
};


  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/menu")
      .then(res => setMenuItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-[#fbe9d0]">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#3c1f0a]">Menu Items</h1>
          <button
            onClick={handleAddItem}
            className="bg-[#e27d60] hover:bg-[#d3614b] cursor-pointer text-white px-4 py-2 rounded-lg transition"
          >
            Add New Item
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#d3614b] text-left text-white">
              <th className="p-3 border">Sr No.</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price (₹)</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.length === 0 ? (
              <tr>
                <td className="p-3 border text-center" colSpan="4">
                  No items added yet!
                </td>
              </tr>
            ) : (
              menuItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.price}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline cursor-pointermy"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
