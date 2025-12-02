import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for mobile menu

function TopNav({ onNewImage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

    // Function to toggle the menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-white py-4 px-6 shadow-md">
            {/* Hamburger Menu Button for Mobile */}
            <button
                onClick={toggleMenu}
                className="sm:hidden text-xl text-blue-500 p-2"
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="flex justify-between items-center">
                {/* Left Section: New Image Button, Scale Length, and Input */}
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onNewImage} // Call the function when clicked
                    >
                        New Image
                    </button>
                    {/* <button className="bg-gray-200 px-4 py-2 rounded">Scale Length</button> */}
                    {/* <input 
                        type="number" 
                        placeholder="9 mm" 
                        className="border px-4 py-2 rounded" 
                    /> */}
                </div>

                {/* Right Section: Save and Logout Buttons */}
                <div className="flex space-x-4">
                    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button> */}
                    {/* <button className="bg-gray-200 px-4 py-2 rounded">Logout</button> */}
                </div>
            </div>

            {/* Mobile Menu: Hidden on large screens, toggled on small screens */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                <div className="flex flex-col space-y-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onNewImage}
                    >
                        New Image
                    </button>
                    <button className="bg-gray-200 px-4 py-2 rounded">Scale Length</button>
                    <input 
                        type="number" 
                        placeholder="9 mm" 
                        className="border px-4 py-2 rounded" 
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    <button className="bg-gray-200 px-4 py-2 rounded">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default TopNav;
