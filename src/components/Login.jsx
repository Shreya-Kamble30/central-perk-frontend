import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CouchBanner from "../assets/couch.png";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      const { token, role} = response.data;

      // Save token + role for authorization
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);


      alert("Login Successful!");

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/menu");
      }

    } catch (error) {
      console.error(error);
      alert("Invalid Username or Password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fbe9d0]">
      <div className="w-full flex justify-center bg-[#fbe9d0]">
        <img src={CouchBanner} alt="Friends Couch Banner" className="w-60 max-h-64 object-contain" />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#3c1f0a] mb-6">
          Login to Central Perk
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#e27d60] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[#e27d60] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e27d60] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#d3614b] transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
