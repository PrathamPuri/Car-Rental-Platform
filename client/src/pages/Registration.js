import React, { useState } from "react";
import Default from "../components/Default";
import carImage from "../assets/carImage.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

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
    console.log(formData);
  };

  return (
    <>
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
            Register for an account
          </h2>
  
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 px-4 py-2 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
  
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-gray-700 px-4 py-2 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
  
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
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
  
            {/* Link to Login Page */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 hover:underline">
                Click here to login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
  

}

export default Registration;
