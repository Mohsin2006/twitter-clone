import React, { useState } from 'react';

function AddPhotoContainer() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Logic to upload the selected file
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // You can implement your upload logic here, like using FormData or sending the file to a server
    } else {
      console.log("Please select a file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
    </div>
  );
}

export default AddPhotoContainer;
