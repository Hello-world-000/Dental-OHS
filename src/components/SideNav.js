// src/components/SideNav.js
import React from 'react';

const SideNav = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* SideNav for large screens */}
      <div
        className={`bg-gray-800 text-white fixed top-0 left-0 h-full md:w-1/10 w-full md:block ${isOpen ? 'block' : 'hidden'}`}
      >
        <h2 className="text-2xl mb-6 p-4">Navigation</h2>
        <ul>
          <li className="mb-4"><a href="/dashboard" className="hover:text-gray-400">Dashboard</a></li>
          <li className="mb-4"><a href="/login" className="hover:text-gray-400">Login</a></li>
          <li className="mb-4"><a href="#" className="hover:text-gray-400">Settings</a></li>
          <li className="mb-4"><a href="#" className="hover:text-gray-400">Help</a></li>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
