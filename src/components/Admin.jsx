import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbe9d0]">
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#3c1f0a] mb-6">
          Admin Dashboard
        </h2>
        <div className="flex flex-col gap-4">
          <Link
            to="/menulist"
            className="w-full bg-[#e27d60] text-white text-lg font-semibold py-4 px-4 rounded-lg hover:bg-[#d3614b] transition text-center"
          >
            Manage Menu
          </Link>


          <Link
            to="/memberlist"
            className="w-full bg-[#e27d60] text-white text-lg font-semibold py-4 px-4 rounded-lg hover:bg-[#d3614b] transition text-center"
          >
            Manage Members
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login", { replace: true });
            }}
            className="w-full bg-[#e27d60] text-white text-lg font-semibold py-4 px-4 cursor-pointer rounded-lg hover:bg-[#d3614b] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
