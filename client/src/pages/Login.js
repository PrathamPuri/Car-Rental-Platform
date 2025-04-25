import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import carImage from "../assets/carImage.jpg";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); 

    const reqObj = { email, password }; 

    dispatch(userLogin(reqObj));
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen px-4 py-10 bg-gray-900">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4 mb-12 lg:mb-0">
        <img
          src={carImage}
          alt="Car"
          className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg"
        />
      </div>
  
      {/* Form Section */}
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-xl rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold text-yellow-400 mb-6">
          Sign in to your account
        </h2>
  
        <form className="space-y-6" onSubmit={handleSubmit}>
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
  
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-md hover:bg-yellow-300 transition duration-200"
          >
            Sign in
          </button>
  
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
