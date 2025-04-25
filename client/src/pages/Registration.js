import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { UserIcon } from "@heroicons/react/24/outline";
import backgroundImg from "../assets/carImage1.jpg"; // Import your background image

function Registration() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(formData));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800 border border-gray-700 shadow-xl rounded-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <UserIcon className="h-10 w-10 text-yellow-400" />
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            Create an Account
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Join us and start your journey today!
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 px-4 py-2 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 px-4 py-2 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-700 px-4 py-2 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-md hover:bg-yellow-300 transition duration-200"
          >
            Sign up
          </button>

          {/* Link to Login */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Click here to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
