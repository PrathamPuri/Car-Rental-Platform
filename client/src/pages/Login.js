import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import backgroundImg from "../assets/carImage1.jpg"; // Import the car background image

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800 border border-gray-700 shadow-xl rounded-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <LockClosedIcon className="h-10 w-10 text-yellow-400" />
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-1">
            Login to continue accessing your dashboard
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md bg-gray-700 px-4 py-2 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-md hover:bg-yellow-300 transition duration-200"
          >
            Sign in
          </button>

          {/* Link to Register */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Click here to register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
