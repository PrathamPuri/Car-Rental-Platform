// pages/Profile.js
import React from 'react';
import Default from "../components/Default";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <Default>
      <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">Your Profile</h1>
        
        <div className="space-y-4 text-lg text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-white">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-white">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </Default>
  );
};

export default ProfilePage;
