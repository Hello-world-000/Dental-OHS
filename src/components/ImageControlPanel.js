import React from 'react';
import { FaTh, FaThLarge, FaSave, FaTrash, FaPlus, FaCheck } from 'react-icons/fa';

const ImageControlPanel = ({ onToggleView, onClearAll, onSaveAll, isGridView, onNewImage, onSubmitImage }) => {
    return (
        <div className="flex flex-col items-center space-y-4 p-4 bg-white shadow-md rounded-md">
            {/* View Toggle */}
            <button
                onClick={onToggleView}
                aria-label="Toggle view"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                {/* Toggle the icon based on the isGridView state with a smooth transition */}
                <span className="mr-2 text-lg transition-all duration-300">
                    {isGridView ? (
                        <FaThLarge className="transition-transform transform" />
                    ) : (
                        <FaTh className="transition-transform transform" />
                    )}
                </span>
                Toggle View
            </button>

            {/* New Image Button with Icon */}
            <button
                onClick={onNewImage}
                aria-label="Add new image"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                <FaPlus className="mr-2 text-lg" /> {/* Icon for New Image */}
                Add New Image
            </button>

            {/* Clear All */}
            <button
                onClick={onClearAll}
                aria-label="Clear all images"
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
                <FaTrash className="mr-2" />
                Clear All Images
            </button>

            {/* Save All */}
            <button
                onClick={onSaveAll}
                aria-label="Save all images"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
                <FaSave className="mr-2" />
                Save All Images
            </button>

             {/* submit All */}
             <button
                onClick={onSubmitImage}
                aria-label="Submit all images"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
                <FaCheck className="mr-2" />
                Submit All Images
            </button>
        </div>
    );
};

export default ImageControlPanel;
