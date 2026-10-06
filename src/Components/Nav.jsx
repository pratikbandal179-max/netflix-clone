import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const transitionNavbar = () => {
    if (window.scrollY > 80) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    // Get user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }

    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const displayName = user?.name
    ? user.name
    : user?.email
      ? user.email.split("@")[0]
      : "";

  return (
    <div
      className={`fixed top-0 w-full px-6 py-4 z-50 transition-all duration-500 ease-in flex items-center justify-between ${
        show ? "bg-[#141414]" : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      {/* डावी बाजू: लोगो + मेनू लिंक्स (Home, TV Shows, Movies...) */}
      <div className="flex items-center space-x-6 md:space-x-8">
        <img
          onClick={() => navigate("/")}
          className="w-24 md:w-28 object-contain cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        {/* Navigation Menu */}
        <ul className="hidden md:flex items-center space-x-5 text-sm">
          <li
            onClick={() => navigate("/")}
            className={`cursor-pointer transition duration-200 hover:text-gray-300 ${
              location.pathname === "/" ? "font-bold text-white" : "text-gray-300 font-normal"
            }`}
          >
            Home
          </li>
          <li
            onClick={() => navigate("/tvshows")}
            className={`cursor-pointer transition duration-200 hover:text-gray-300 ${
              location.pathname === "/tvshows" ? "font-bold text-white" : "text-gray-300 font-normal"
            }`}
          >
            TV Shows
          </li>
          <li
            onClick={() => navigate("/movies")}
            className={`cursor-pointer transition duration-200 hover:text-gray-300 ${
              location.pathname === "/movies" ? "font-bold text-white" : "text-gray-300 font-normal"
            }`}
          >
            Movies
          </li>
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer text-gray-300 hover:text-gray-300 transition duration-200"
          >
            New & Popular
          </li>
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer text-gray-300 hover:text-gray-300 transition duration-200"
          >
            My List
          </li>
        </ul>
      </div>

      {/* उजवी बाजू: सर्च, युझरनेम, लॉगआउट आणि अवतार */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <svg
          onClick={() => navigate("/search")}
          className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {user ? (
          <>
            <span className="text-white text-sm font-medium capitalize hidden sm:inline-block">
              Hi, {displayName}
            </span>

            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white text-xs bg-red-600/80 hover:bg-red-700 px-2.5 py-1 rounded transition duration-200 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-white hover:text-gray-300 font-medium text-sm transition duration-200"
          >
            Login
          </button>
        )}

        {/* Smiley Avatar */}
        <div
          onClick={() => navigate("/profile")}
          className="w-8 h-8 rounded bg-[#e50914] flex items-center justify-center cursor-pointer hover:opacity-85 shadow-md overflow-hidden"
          title={displayName || "Profile"}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <circle cx="8" cy="9" r="1.5" />
            <circle cx="16" cy="9" r="1.5" />
            <path
              d="M7 14c1.5 2 4.5 2.5 5 2.5s3.5-.5 5-2.5"
              stroke="white"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;