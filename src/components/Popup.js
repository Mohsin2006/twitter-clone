import React, { useState } from 'react';
import './Popup.css'; // Import CSS file for styling
import AddPhotoContainer from './AddPhotoContainer';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container flex-wrap">
      <button onClick={togglePopup}>Open Popup</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className='flex items-center justify-between mb-3'>
                <h1>Edit Profile</h1>
                <button className='bg-black text-white px-4 py-1 rounded-full '>Save</button>
            </div>
            <div>
                <textarea cols={65} placeholder='Name'   className='border rounded-lg mb-1 border-gray-600  outline-blue-600'></textarea>
                <textarea cols={65} rows={4} placeholder='Bio'  className='border mb-1 rounded-lg border-gray-600 outline-blue-600'></textarea>
                <textarea cols={65} placeholder='Location'  className='border mb-1 rounded-lg border-gray-600  outline-blue-600'></textarea>
                <textarea cols={65} placeholder='Website'  className='border rounded-lg border-gray-600  outline-blue-600 '></textarea>

            </div>
            <div  className='border py-8 mb-1 rounded-lg border-gray-600  outline-blue-600'>
                <AddPhotoContainer/>
            </div>
            <button className='font-bold' onClick={togglePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
