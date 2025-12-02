import React, { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import TopNav from './TopNav';
import SideToolbar from './SideToolbar';
import ImageControlPanel from './ImageControlPanel';
import JSZip from 'jszip';
import { useNavigate } from 'react-router-dom';
import { UploadImageForAnalysis } from '../api';

import splashGif from '../assets/dental-clinic_9534762.gif';

function MainContent() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [viewSize, setViewSize] = useState('medium');

    const [submitLoading, setLoading] = useState(false); // For loading state

    const navigate = useNavigate(); // React Router's navigate function
    const handleNewImage = () => {
        fileInputRef.current.click();
    };

    const handleSubmitImage = async () => {
        if (images.length > 0) {
            // Set loading to true when the image submission starts
            setLoading(true);

            // setTimeout(()=>{console.log("Timeout finish ", submitLoading)}, 3000);

    
            const formData = new FormData();
    
            // Loop through all images and convert them to Files
            images.forEach((image, index) => {
                // console.log(image)

                const randomNum = Math.floor(Math.random() * 100000);

                const file = dataURLToFile(image.src, `image_${index + 1}_${randomNum}.jpg`);
                formData.append('files', file); // Append each image file to FormData
            });
    
            try {
                

                const response = await UploadImageForAnalysis(formData)
    
                console.log(response)
    
                // Get the response data (detections and classifications)
                // const data = await response.json();

                if (!response.Results) {
                    throw new Error('Failed to submit images');
                }

                const data = response.Results

                if(Object.keys(data).length === 0){
                    alert("No Results"); 
                    
                }
                else{
                    // Navigate to results page with the response data
                    navigate('/results', { state: { imageData: data, images, detections: data.yolo_results, classifications: data.resnet_class_ids } });
                }

                // console.log("data: --------------------------------------------------------------")

                // console.log(data)
            } catch (error) {
                console.error("Error submitting images:", error);
            } finally {
                // Set loading to false after the server response is received
                setLoading(false);
            }
        }
    };
    
    // Helper function to convert base64 image to File
    const dataURLToFile = (dataUrl, filename) => {
        const arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n);
        // console.log(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages = Array.from(files).map(file => {
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(newImages).then((imageUrls) => {
                setImages((prevImages) => [
                    ...prevImages,
                    ...imageUrls.map((url) => ({
                        src: url,
                        styles: {
                            filter: '',
                            transform: '',
                            gridLines: false,
                        }
                    }))
                ]);
                setSelectedImage(imageUrls[0]);
            });
        }
    };

    const handleSelectImage = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const handleRemoveImage = (imageSrc) => {
        setImages((prevImages) => prevImages.filter(img => img.src !== imageSrc));
        if (selectedImage === imageSrc) {
            setSelectedImage(null);
        }
    };

    const updateImageStyles = (imageSrc, newStyles) => {
        setImages((prevImages) =>
            prevImages.map((img) =>
                img.src === imageSrc ? { ...img, styles: { ...img.styles, ...newStyles } } : img
            )
        );
    };

    const handleContrastChange = (value) => {
        if (selectedImage) {
            updateImageStyles(selectedImage, { filter: `contrast(${value}%)` });
        }
    };

    const handleSharpnessChange = (value) => {
        if (selectedImage) {
            updateImageStyles(selectedImage, { filter: `brightness(${value}%)` });
        }
    };

    const handleZoomImage = (zoomIn) => {
        if (selectedImage) {
            updateImageStyles(selectedImage, { transform: `scale(${zoomIn/100})` });
        }
    };

    const handleRotateImage = (degrees) => {
        if (selectedImage) {
            updateImageStyles(selectedImage, { transform: `rotate(${degrees}deg)` });
        }
    };

    const handleGridLinesToggle = () => {
        if (selectedImage) {
            const newGridLines = !images.find(img => img.src === selectedImage).styles.gridLines;
            updateImageStyles(selectedImage, { gridLines: newGridLines });
        }
    };

    const handleClearAll = () => {
        setImages([]);
        setSelectedImage(null);
    };

    const toggleViewSize = () => {
        const newSize = viewSize === 'small' ? 'medium' : viewSize === 'medium' ? 'large' : 'small';
        setViewSize(newSize);
    };

    const getTransformationMatrix = (transform) => {
        const matrix = new DOMMatrix();
        if (transform.includes('rotate')) {
            const angle = parseInt(transform.match(/rotate\(([^)]+)\)/)[1]);
            matrix.rotate(angle);
        }
        if (transform.includes('scale')) {
            const scale = parseFloat(transform.match(/scale\(([^)]+)\)/)[1]);
            matrix.scale(scale);
        }
        return matrix;
    };

    const handleSaveAll = () => {
        const zip = new JSZip();
        images.forEach((image, index) => {
            const imageName = `image_${index + 1}.jpg`;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                const matrix = getTransformationMatrix(image.styles.transform);
                ctx.filter = image.styles.filter;
                ctx.setTransform(matrix);
                ctx.drawImage(img, 0, 0);
                const newBase64Image = canvas.toDataURL('image/jpeg');
                zip.file(imageName, newBase64Image.split(',')[1], { base64: true });
                if (index === images.length - 1) {
                    zip.generateAsync({ type: 'blob' }).then((content) => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(content);
                        link.download = 'images.zip';
                        link.click();
                    });
                }
            };
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Show loading overlay */}
            {submitLoading && (
        <div
          style={{
            position: "fixed", // Make it cover the full screen
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            display: "flex", // Enable Flexbox
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            zIndex: 9999, // Ensure it stays on top of other content
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={splashGif} // Ensure this path is correct
              alt="Loading..."
              style={{
                width: "100px", // Adjust the size of the loader
                height: "auto",
                borderRadius: "70px", // Rounded corners
              }}
            />
          </div>
        </div>
      )}
    <div className="flex flex-1 flex-col sm:flex-row">

        

        {/* Sidebar - SideToolbar (Responsive) */}
        <div className={`p-4 sm:block ${!selectedImage && !(images.length > 0) && 'pointer-events-none opacity-50'} sm:w-2/5 lg:w-2/5`}>
            <div className="w-full bg-white shadow-md p-4 mb-4">
                <ImageControlPanel
                    onToggleView={toggleViewSize}
                    onClearAll={handleClearAll}
                    onSaveAll={handleSaveAll}
                    isGridView={true}
                    onNewImage={handleNewImage} // Pass down the new image handler
                    onSubmitImage = {handleSubmitImage}
                    submitLoading = {submitLoading}
                />
            </div>

            {/* Image Thumbnails List */}
            {images.length > 0 && (
                <div className="relative mt-4 overflow-x-auto pb-4">
                    <div className="flex space-x-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative group flex-shrink-0">
                                <img
                                    src={image.src}
                                    alt={`Uploaded ${index}`}
                                    className={`
                                        ${viewSize === 'small' ? 'w-20 h-20' : ''}
                                        ${viewSize === 'medium' ? 'w-32 h-32' : ''}
                                        ${viewSize === 'large' ? 'w-48 h-48' : ''}
                                        object-cover rounded-lg shadow-lg cursor-pointer
                                    `}
                                    onClick={() => handleSelectImage(image.src)}
                                />
                                <button
                                    onClick={() => handleRemoveImage(image.src)}
                                    className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full shadow-md hover:bg-red-100"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {selectedImage && (
                <SideToolbar
                    imageStyles={images.find(img => img.src === selectedImage)?.styles}
                    handleZoomImage={handleZoomImage}
                    handleRotateImage={handleRotateImage}
                    handleSharpnessChange={handleSharpnessChange}
                    handleContrastChange={handleContrastChange}
                    handleGridLinesToggle={handleGridLinesToggle}
                />
            )}
        </div>

        {/* Main Content */}
        <div className="mt-8 w-full sm:w-3/4 lg:w-4/5 p-4">
            {/* File Input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
                multiple
            />

            {/* No Image Selected */}
            {!selectedImage && images.length === 0 ? (
                <div className="text-center text-gray-500 p-4 border-2 border-gray-300 rounded-md cursor-pointer" onClick={handleNewImage}>
                    <p>Click here to upload image</p>
                </div>
            ) : null}   
            
            {selectedImage && (
                <div className="mt-8 w-full"
                style={{
                    
                    height: '100%'}} >
                    <h2 className="text-xl font-semibold mb-4">Selected Image</h2>
                    <div
                        className="relative overflow-hidden"
                        style={{
                            width: '100%',
                            height: '93%',
                            maxWidth: '100%',
                            border: images.find(img => img.src === selectedImage)?.styles.gridLines ? '1px solid #000' : 'none',
                            padding: images.find(img => img.src === selectedImage)?.styles.gridLines ? '10px' : '0',
                            backgroundColor: '#f0f0f0',
                            overflow: 'auto', // Enable scrolling if image is larger than the container
                            display: 'flex',
                            justifyContent: 'center', // Centers the image horizontally
                            alignItems: 'center', // Centers the image vertically
                            scrollbarWidth: 'none', 
                        }}
                    >
                        <img
                            src={selectedImage}
                            alt="Full View"
                            // className="absolute"
                            style={{
                                filter: images.find(img => img.src === selectedImage)?.styles.filter,
                                transform: images.find(img => img.src === selectedImage)?.styles.transform,
                                objectFit: 'contain',
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                    </div>
                    
                </div>
            )}
        </div>
    </div>
</div>

    );
}

export default MainContent;
