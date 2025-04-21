import React from "react";
import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

function Default(props) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between p-5 bg-gradient-to-b from-gray-900 to-gray-800 border-b border-gray-700 shadow-lg">
        <Link to="/" className="text-3xl font-bold text-yellow-400 hover:text-yellow-300">
          RentACar
        </Link>

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="bg-yellow-400 text-gray-900 font-medium px-4 py-2 rounded-md shadow hover:bg-yellow-500 transition">
            {user.name || "User"}
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-700 text-yellow-400" : "text-white"
                    }`}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-700 text-yellow-400" : "text-white"
                    }`}
                  >
                    Home
                  </Link>
                )}
              </Menu.Item>

             
              

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? "bg-red-700 text-white" : "text-red-500"
                    }`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </header>

      {/* Page Content */}
      <main className="flex-grow p-4">{props.children}</main>
    </div>
  );
}

export default Default;
