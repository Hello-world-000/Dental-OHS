import React, { useState } from 'react';
import { FaSearch, FaTh, FaThLarge, FaUpload, FaCog, FaUserCircle, FaBell } from 'react-icons/fa';
import { AppBar, Toolbar, Button, Menu, MenuItem, Popover, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

import AppTitle from './AppTitle';

function Header({ onNewImage }) {
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Search bar toggle state
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Notification dropdown state
    const [anchorEl, setAnchorEl] = useState(null); // Anchor for user profile dropdown
    const [notificationAnchor, setNotificationAnchor] = useState(null); // Anchor for notification popover
    const navigate = useNavigate(); // Use navigate for routing

    // Handle dark mode toggle
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    // Handle search bar toggle
    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // Handle notification popover toggle
    const handleNotificationClick = (event) => {
        setNotificationAnchor(event.currentTarget); // Set the position of the popover
    };

    // Handle user profile dropdown open/close
    const handleUserProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle closing user profile dropdown
    const handleCloseUserProfile = () => {
        setAnchorEl(null);
    };

    // Handle navigation to profile management
    const handleProfileRedirect = () => {
        navigate('/doctors'); // Redirect to user profile page using navigate
    };

    // Dummy notifications
    const notifications = [
        "A new patient registered in OPD.",
        "Rahul lab reports completed",
        "Gaurav appointment in 1 hour",
    ];

    // Handle logout (for now, just logging out to console)
    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('access_token');

        // Add logout functionality here, e.g., clearing tokens, redirecting to login page
        navigate('/login'); // Redirect to login page after logout using navigate
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-white p-4">
           
           <AppTitle/>

            {/* Navigation and Action Icons */}
            <div className="flex items-center justify-between space-x-4">
                {/* Left Section - Branding and View Icons */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            <FaTh /> {/* Grid View Icon */}
                        </button>
                        <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            <FaThLarge /> {/* List View Icon */}
                        </button>
                    </div>
                </div>

                {/* Center Section - Search Bar */}
                <div className="flex items-center space-x-4">
                    {isSearchOpen ? (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search images..."
                                className="p-2 pl-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
                            />
                            <FaSearch className="absolute left-2 top-2 text-gray-500 dark:text-gray-300" />
                        </div>
                    ) : (
                        <button
                            onClick={handleSearchToggle}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
                        >
                            <FaSearch /> {/* Search Icon */}
                        </button>
                    )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center space-x-4">
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/doctors">
                        doctors
                    </Button>
                    <Button color="inherit" component={Link} to="/patients">
                        Patients
                    </Button>
                    <Button color="inherit" component={Link} to="/treatments">
                        Treatments
                    </Button>

                    {/* Dark mode toggle button */}
                    {/* <button
                        onClick={handleToggleDarkMode}
                        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    >
                        {isDarkMode ? (
                            <span>Light Mode</span> // Switch to Light Mode when dark mode is on
                        ) : (
                            <span>Dark Mode</span> // Switch to Dark Mode when light mode is on
                        )}
                    </button> */}

                    {/* Notification Icon */}
                    <button
                        onClick={handleNotificationClick}
                        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    >
                        <FaBell />
                    </button>

                    {/* Notification Popover */}
                    <Popover
                        open={Boolean(notificationAnchor)}
                        anchorEl={notificationAnchor}
                        onClose={() => setNotificationAnchor(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div className="w-64 p-4 bg-white shadow-lg rounded-lg">
                            <Typography variant="h6" className="font-semibold">Notifications</Typography>
                            <ul className="mt-2 space-y-2">
                                {notifications.map((notification, index) => (
                                    <li key={index} className="text-gray-700 dark:text-gray-300">
                                        {notification}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Popover>

                    {/* User Profile Icon (Dropdown Menu) */}
                    <button
                        onClick={handleUserProfileClick}
                        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    >
                        <FaUserCircle />
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseUserProfile}
                    >
                        <MenuItem onClick={handleProfileRedirect}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                    {/* Settings Icon */}
                    <button
                        onClick={handleProfileRedirect}
                        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    >
                        <FaCog />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
