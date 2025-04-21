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
    <div className="flex justify-end min-h-screen px-6 py-12 bg-gray-900">
      <div className="flex pl-10 items-center w-3/4">
        <img src={carImage} alt="Car" className="w-2/3" />
      </div>

      <div className="w-full max-w-md bg-gray-800 border-gray-600 shadow-lg rounded-md h-fit p-6">
        <h2 className="text-center text-2xl font-bold text-gray-300">
          Sign in to your account
        </h2>

        <form className="mt-6 py-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md bg-gray-800 px-3 py-2 text-gray-100 border border-gray-600 focus:ring-2 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md bg-gray-800 px-3 py-2 text-gray-100 border border-gray-600 focus:ring-2 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-500"
          >
            Sign in
          </button>

          <Link to="/register" className="block text-center text-blue-400 mt-2">
            Click Here To Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
