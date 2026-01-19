import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Error: " + errorText);
        return;
      }

      alert("New Member Added Successfully!");

      navigate("/memberlist", { replace: true });
  // redirect after success

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fbe9d0] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#3c1f0a]">
          Add New Member
        </h2>

        <div className="flex flex-col text-gray-700">
          <label className="mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#e27d60] focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col text-gray-700">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#e27d60] focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col text-gray-700">
          <label className="mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#e27d60] focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col text-gray-700">
          <label className="mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#e27d60] focus:outline-none"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#e27d60] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#d3614b] transition cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
