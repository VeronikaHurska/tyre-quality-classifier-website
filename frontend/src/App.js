import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Added state to store the image URL
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0])); // Create a URL for the selected image
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:4242/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <div className='block'>
        <h1>Tyre Quality Classifier</h1>
        <div>
          <label className="file-input-label" onClick={handleChooseFileClick}>
            Choose Image
            <input

              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ position: 'absolute', left: '-9999px' }}
            />
          </label>
          <button onClick={handleUpload}>Upload & Predict</button>

        </div>



        {imageUrl && <img src={imageUrl} alt="Selected" width="300" />}

        {prediction && (
          <div>
            <h2>Prediction:</h2>
            <p>Class: {prediction.class}</p>
            <p>Confidence: {prediction.confidence*100}%</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default App;