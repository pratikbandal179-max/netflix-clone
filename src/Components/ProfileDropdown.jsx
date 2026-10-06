import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Avatar */}
      <img
        className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-white transition"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-12 w-48 bg-black bg-opacity-95 border border-gray-700 rounded shadow-lg z-50">
            <div className="py-2">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition flex items-center space-x-3"
              >
                <img
                  className="w-8 h-8 rounded"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  alt="User"
                />
                <span>Account</span>
              </button>

              <div className="border-t border-gray-700 my-2"></div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add functionality
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition text-sm"
              >
                Manage Profiles
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add functionality
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition text-sm"
              >
                Transfer Profile
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add functionality
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition text-sm"
              >
                Account Settings
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add functionality
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition text-sm"
              >
                Help Center
              </button>

              <div className="border-t border-gray-700 my-2"></div>

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition text-sm"
              >
                Sign out of Netflix
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileDropdown;