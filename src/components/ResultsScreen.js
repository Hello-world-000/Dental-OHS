import React from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

function ResultsScreen({ images, selectedImage, onGenerateReport, onGiveFeedback }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation */}
            <div className="bg-white shadow-md p-4">
                <h1 className="text-xl font-semibold">Image Results</h1>
            </div>

            {/* Image and Control Panel */}
            <div className="flex flex-1 flex-col sm:flex-row p-4">
                {/* Image Thumbnails */}
                <div className="p-4 sm:w-2/5 lg:w-2/5">
                    <h2 className="text-lg font-semibold">Uploaded Images</h2>
                    <div className="mt-4 space-y-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative group flex-shrink-0">
                                <img
                                    src={image.src}
                                    alt={`Uploaded ${index}`}
                                    className="w-24 h-24 object-cover rounded-lg shadow-lg cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resulted Image Display */}
                <div className="mt-8 sm:w-3/4 lg:w-3/5 p-4">
                    <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
                    <div
                        className="relative overflow-hidden"
                        style={{
                            width: '100%',
                            height: '500px',
                            backgroundColor: '#f0f0f0',
                            border: selectedImage?.styles.gridLines ? '1px solid #000' : 'none',
                            padding: selectedImage?.styles.gridLines ? '10px' : '0',
                        }}
                    >
                        <img
                            src={selectedImage.src}
                            alt="Processed Result"
                            className="absolute"
                            style={{
                                filter: selectedImage.styles.filter,
                                transform: selectedImage.styles.transform,
                                objectFit: 'contain',
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="mt-4 flex space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                            onClick={onGenerateReport}
                        >
                            Generate Report
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
                            onClick={onGiveFeedback}
                        >
                            Feedback
                        </button>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="p-4 text-center">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Upload
                </Link>
            </div>
        </div>
    );
}

export default ResultsScreen;
