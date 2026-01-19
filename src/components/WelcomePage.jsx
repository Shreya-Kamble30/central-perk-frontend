// src/pages/WelcomePage.jsx
import { Link } from "react-router-dom";
import CentralPerkLogo from "../assets/centralperk.png";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4F0E0E] text-center px-4">
      
      {/* Central Perk Logo */}
      <img
        src={CentralPerkLogo}
        alt="Central Perk Logo"
        className="w-94 mb-3"
      />

      {/* Welcome Heading */}
      <h1 className="text-5xl font-extrabold text-[#FFB22C] mb-4 drop-shadow-lg">
        Welcome to Central Perk Café
      </h1>

      {/* Tagline */}
      <p className="text-xl text-[#F7F7F7] mb-10 font-semibold">
        “The One Where You Get Coffee and Friends”
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-8 py-3 rounded-xl bg-[#FFB22C] text-black font-semibold hover:bg-[#854836] hover:text-white hover:scale-105 transition transform"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
