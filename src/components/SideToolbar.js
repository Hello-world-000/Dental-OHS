import React, { useState } from 'react';
import { 
    FaAdjust, FaSun, FaMoon, FaSearchPlus, FaSearchMinus,
    FaArrowsAltV, FaArrowsAltH, FaRedo, FaPlus, FaGripHorizontal, FaBars, FaTimes 
} from 'react-icons/fa';

// Reusable button component for each tool
const ToolButton = ({ icon, title }) => (
    <div className="relative group flex justify-center">
        <button 
            aria-label={title}
            className="icon-button flex flex-col items-center justify-center active:shadow-lg active:scale-95 transition-all duration-300"
        >
            <span className="text-lg">{icon}</span>
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-300 bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            {title}
        </span>
    </div>
);

function SideToolbar({imageStyles, handleZoomImage, handleRotateImage, handleSharpnessChange, handleContrastChange}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar visibility
    const [hoveredSection, setHoveredSection] = useState(null); // State to track which section is hovered

    const tools = [
        // { icon: <FaAdjust />, title: 'Invert', section: 'Sharpness' },
        // { icon: <FaGripHorizontal />, title: 'Sharpen', section: 'Sharpness' },
        // { icon: <FaSun />, title: 'Increase', section: 'Contrast' },
        // { icon: <FaMoon />, title: 'Decrease', section: 'Contrast' },
        // { icon: <FaSearchPlus />, title: 'Zoom In', section: 'Zoom' },
        // { icon: <FaSearchMinus />, title: 'Zoom Out', section: 'Zoom' },
        // // { icon: <FaArrowsAltV />, title: 'Add Vertical Guidelines', section: 'Add Guidelines' },
        // // { icon: <FaArrowsAltH />, title: 'Add Horizontal Guidelines', section: 'Add Guidelines' },
        // { icon: <FaRedo style={{ transform: 'rotate(270deg)' }} />, title: 'Rotate Left', section: 'Rotate' },
        // { icon: <FaRedo />, title: 'Rotate Right', section: 'Rotate' },
        // { icon: <FaPlus />, title: 'Add Overlay', section: 'Overlay' },
    ];

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close the sidebar when clicking outside
    const handleBackdropClick = () => {
        setIsSidebarOpen(false);
    };

    // Handle mouse enter and leave for sections to show/hide sliders
    const handleMouseEnter = (section) => {
        setHoveredSection(section);
    };

    const handleMouseLeave = () => {
        setHoveredSection(null);
    };

    return (
        <div className="relative">
           

            {/* Sidebar */}
            <div
                className={`top-0 left-0 shadow-md sm:block transition-transform sm:relative sm:translate-x-0 mt-4`}
            >
                <div className="flex flex-col items-center p-4 space-y-6 max-h-screen">
                    {Array.from(new Set(tools.map(tool => tool.section)))
                        .filter(section => section !== 'Move' && section !== 'Overlay') // Remove "Move" and "Overlay" sections
                        .map(section => (
                        <div
                            key={section}
                            className="w-full text-center"
                            onMouseEnter={() => handleMouseEnter(section)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <h3 className="text-sm font-semibold text-gray-500">{section}</h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {tools.filter(tool => tool.section === section).map((tool, index) => (
                                    <ToolButton key={index} icon={tool.icon} title={tool.title} />
                                ))}
                            </div>

                            {/* Show slider for hovered section */}
                            {hoveredSection === section && (
                                <div className="mt-4 w-full">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        defaultValue="50"
                                        className="w-full"
                                    />
                                    <div className="text-center text-xs text-gray-500">Adjust Value</div>
                                </div>
                            )}

                              
                        </div>
                    ))}

                            <div className="mt-4 w-full">
                                <label className="block text-sm">Zoom</label>
                                <input
                                    type="range"
                                    min="50"
                                    max="300"
                                    
                                    value={parseFloat(imageStyles.transform.split('scale(')[1]?.split(')')[0] || 1)*100}
                                    onChange={(e) => handleZoomImage(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            {/* Rotation Slider */}
                            <div className="mt-4 w-full">
                                <label className="block text-sm">Rotate</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={parseInt(imageStyles.transform.split('rotate(')[1]?.split('deg')[0] || 0)}
                                    onChange={(e) => handleRotateImage(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            
                            <div className="mt-4 w-full">
                                <label className="block text-sm">Sharpness</label>
                                <input
                                    type="range"
                                    min="50"
                                    max="300"
                                    value={parseInt(imageStyles.filter.split('brightness(')[1]?.split('%')[0] || 100)}
                                    onChange={(e) => handleSharpnessChange(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            {/* Contrast Slider */}
                            <div className="mt-4 w-full">
                                <label className="block text-sm">Contrast</label>
                                <input
                                    type="range"
                                    min="50"
                                    max="300"
                                    value={parseInt(imageStyles.filter.split('contrast(')[1]?.split('%')[0] || 100)}
                                    onChange={(e) => handleContrastChange(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                </div>
            </div>
        </div>
    );
}

export default SideToolbar;
