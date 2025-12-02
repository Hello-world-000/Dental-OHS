import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { jsPDF } from "jspdf";  // Import jsPDF

import { sendFeedback } from '../api';


// const API_URL = 'http://127.0.0.1:5000/static/';  

const API_URL = 'http://3.80.126.80:5000/static/';  

const ResultsPage = () => {
  const location = useLocation();
  const { imageData, detections, classifications } = location.state || {};

  // Extracting an array of all 'full_image' values
  const imagePaths = Object.values(imageData).map(item => item.full_image);

  console.log(imageData)

  const imageSegmentsPaths = Object.keys(imageData).reduce((acc, key) => {

    const fullpath = imageData[key].full_image
    
  // For each image, get the segments and store them in the dictionary
    const segments = imageData[key][fullpath]

    // console.log(imageData[key][fullpath])
    
    // Add the image path as the key, and the segments as the value
    acc[fullpath] = segments
    
    return acc;
  }, {});



  // console.log(imageSegmentsPaths);

  const [selectedImage, setSelectedImage] = useState(imagePaths?.[0] || '');


  // Handle image selection
  const handleSelectImage = (src) => {
    setSelectedImage(src);
  };

  // Handle image removal
  const handleRemoveImage = (src) => {
    const updatedImages = imagePaths.filter((image) => image !== src);
    setSelectedImage(updatedImages[0] || ''); // Select the first image if any left
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add patient dummy details to the PDF
    doc.setFontSize(16);
    doc.text("Patient Details", 10, 10);
    doc.setFontSize(12);
    doc.text("Name: ..............", 10, 20);
    doc.text("Age: ...............", 10, 30);
    doc.text("Gender: ............", 10, 40);
    doc.text("Diagnosis: Furcation", 10, 50);
    doc.text("Date: ..............", 10, 60);
    
    doc.addPage();

    console.log("imagePaths : ",imagePaths)

    // doc.text("Furcation Report : ",10, 10 + (1 * 40))

    // Loop through each image and add image results to the PDF
    imagePaths.forEach((imagePath, i) => {

      var index = 0
      if(i%2 == 0){
        index = 0
      }
      else{
        index = 3.5
      }
      // Add image name as a section header
      doc.setFontSize(14);
      // doc.text(`Results for Image ${index + 1}: ${imagePath}`, 10, 10 + (index * 40));

      // doc.text("Furcation Report : ",10, 10 + (index * 40))

      // Add image (use the full URL for image)
      const imageUrl = `${API_URL}${imagePath}`;

      doc.addImage(imageUrl, 'JPEG', 10, 20 + (index * 40), 180, 120); // Adjust size as needed

      // Add YOLO detection results
      const detectionResults = detections?.[index];
      if (detectionResults && detectionResults.length > 0) {
        doc.setFontSize(12);
        doc.text("YOLO Detection Results:", 10, 150 + (index * 160));
        detectionResults.forEach((det, detIndex) => {
          doc.text(`Detection ${detIndex + 1}:`, 10, 160 + (index * 160) + (detIndex * 10));
          doc.text(`Top: ${det.top}%`, 20, 170 + (index * 160) + (detIndex * 10));
          doc.text(`Left: ${det.left}%`, 20, 180 + (index * 160) + (detIndex * 10));
          doc.text(`Width: ${det.width}%`, 20, 190 + (index * 160) + (detIndex * 10));
          doc.text(`Height: ${det.height}%`, 20, 200 + (index * 160) + (detIndex * 10));
        });
      } else {
        // doc.text("No detections found.", 10, 150 + (index * 160));
      }

      // Add ResNet Classification Results
      const classification = classifications?.[index];
      if (classification) {
        doc.setFontSize(12);
        doc.text("ResNet Classification:", 10, 220 + (index * 160));
        doc.text(`Class: ${classification.class}`, 20, 230 + (index * 160));
        doc.text(`Confidence: ${classification.confidence}%`, 20, 240 + (index * 160));
        doc.text(`Prediction Time: ${classification.time}s`, 20, 250 + (index * 160));
      } else {
        // doc.text("No classification results.", 10, 220 + (index * 160));
      }

      // Add page break after each image's result (except the last)
      if (i%2 == 1 && i < imagePaths.length - 1) {
        doc.addPage();
      }
    });

    // Save the PDF
    doc.save("results.pdf");
  };

  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const handleEnableFeedback = () => {
    setIsFeedbackEnabled(true);

    console.log("handleEnableFeedback : ")
    console.log(isFeedbackEnabled , selectedImage , imageSegmentsPaths[selectedImage])
  };

  console.log("Second : ",isFeedbackEnabled , selectedImage , imageSegmentsPaths[selectedImage])


  const handleLabelChange = (segment, label) => {
    setFeedback({
      ...feedback,
      [segment]: label,
    });
  };

  const handleSubmitFeedback = async () => {
    // Send feedback to the server (you can call an API here)

    console.log(feedback)
    const response = await sendFeedback(feedback);

    console.log("feedback : ", feedback)
    // alert('Feedback submitted!');
    setIsFeedbackEnabled(false);
    setIsFeedbackSubmitted(true)
  };

  

  const getSegmentLabels = (segments) => {
    console.log("getSegmentLabels :  ", segments)
    return segments.map((segment, index) => (
      <div key={index} className="mb-4">
        <div className="flex items-center space-x-4"> {/* space-x-4 for horizontal spacing */}
          <img
            src={`${API_URL}${segment}`}
            alt={`Segment ${index}`}
            className="w-32 h-32 rounded-lg"
          />
          <div>
            <label htmlFor={`label-${segment}`} className="block font-medium">Label (0-3):</label>
            <input
              type="number"
              id={`label-${segment}`}
              name={`label-${segment}`}
              value={feedback[segment] || ""}
              onChange={(e) => handleLabelChange(segment, e.target.value)}
              min={0}
              max={3}
              className="w-16 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    ));
    
  };

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-6">
      {/* Image Thumbnails List */}
      {imageData && Object.keys(imageData).length > 0 && (
        <div className="relative mt-4 overflow-x-auto pb-4">
          <div className="flex space-x-4">
            {Object.keys(imageData).map((filename, index) => {
              const fullImagePath = imageData[filename].full_image; // Get full image path

              return (
                <div key={index} className="relative group flex-shrink-0">
                  <img
                    src={`${API_URL}${fullImagePath}`}
                    alt={`Uploaded ${index}`}
                    className={`
                      ${selectedImage === fullImagePath ? 'border-4 border-blue-500' : ''}
                      w-32 h-32 object-cover rounded-lg shadow-lg cursor-pointer
                    `}
                    onClick={() => handleSelectImage(fullImagePath)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="grid gap-8">
        {/* Detection and Classification Results Section */}
        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Results</h2>
          <div className="relative">
            {selectedImage && (
              <img
                src={`${API_URL}${selectedImage}`}
                alt="YOLO Results"
                className="max-w-full rounded-lg border-2 border-gray-300 shadow-md"
              />
            )}
            {selectedImage &&
              detections?.[Object.keys(imageData).indexOf(selectedImage)]?.map((det, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: `${det.top}%`,
                    left: `${det.left}%`,
                    width: `${det.width}%`,
                    height: `${det.height}%`,
                    border: '4px solid red',
                  }}
                ></div>
              ))}
          </div>

          {/* <div className="mt-6 w-full">
            <h3 className="text-lg font-semibold text-blue-500">ResNet Classification</h3>
            <div className="mt-2 space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Class: </span>
                <span className="text-gray-700">{classifications?.[Object.keys(imageData).indexOf(selectedImage)]?.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Confidence: </span>
                <span className="text-gray-700">{classifications?.[Object.keys(imageData).indexOf(selectedImage)]?.confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Prediction Time: </span>
                <span className="text-gray-700">{classifications?.[Object.keys(imageData).indexOf(selectedImage)]?.time}s</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Add Feedback Button */}
      {selectedImage && !isFeedbackSubmitted && !isFeedbackEnabled && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleEnableFeedback}
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Feedback
          </button>
        </div>
      )}

      {/* Segments Feedback Section */}
      {!isFeedbackSubmitted && isFeedbackEnabled && selectedImage && imageSegmentsPaths[selectedImage] && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Segment Feedback</h2>
          {getSegmentLabels(imageSegmentsPaths[selectedImage])}
          
          {/* Submit Feedback Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmitFeedback}
              className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      {/* Download Button */}
      <div className="mt-8 flex justify-center">
        {selectedImage && (
          <button
            onClick={generatePDF}
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Download Results as PDF
          </button>
        )}
      </div>
    </div>
  );

};

export default ResultsPage;
