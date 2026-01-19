import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null); // Track which menu is open
  const [confirmDelete, setConfirmDelete] = useState({ open: false, memberId: null }); // Delete modal

  // Fetch members from backend
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    api.get("/user")
      .then(res => setMembers(res.data))
      .catch(err => console.error("Error fetching members:", err));
  };

  // Toggle three dots menu
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setConfirmDelete({ open: true, memberId: id });
    setOpenMenuId(null); // close menu
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    api.delete(`/users/${confirmDelete.memberId}`)
      .then(() => {
        alert("Member deleted successfully");
        setMembers(members.filter(m => m.id !== confirmDelete.memberId));
      })
      .catch(err => {
        console.error("Error deleting member:", err);
        alert("Failed to delete member");
      });
    setConfirmDelete({ open: false, memberId: null });
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setConfirmDelete({ open: false, memberId: null });
  };

  return (
    <div className="min-h-screen px-8 py-10 bg-[#fbe9d0]">
      <h1 className="text-4xl font-bold text-center text-[#3c1f0a] mb-6">
        Members Management
      </h1>

      <div className="flex justify-center mb-10">
        <Link
          to="/register"
          className="w-full bg-[#e27d60] text-white text-lg font-semibold py-4 px-4 rounded-lg hover:bg-[#d3614b] transition text-center max-w-xs"
        >
          Add Member
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
        {members.length === 0 ? (
          <p className="text-gray-700 text-lg">No members found.</p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="w-full max-w-xl bg-white shadow-md rounded-2xl p-6 border border-gray-100 transition hover:shadow-lg relative"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaUser className="text-[#d3614b] text-xl" />
                  <h3 className="text-lg font-bold text-gray-800">
                    {member.username}
                  </h3>
                </div>

                {/* Three dots menu */}
                <div className="relative">
                  <BsThreeDotsVertical
                    className="text-gray-500 cursor-pointer"
                    onClick={() => toggleMenu(member.id)}
                  />

                  {openMenuId === member.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => openDeleteModal(member.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600">Role: {member.role}</p>
            </div>
          ))
        )}
      </div>

      {/* Custom delete confirmation modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this member?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
