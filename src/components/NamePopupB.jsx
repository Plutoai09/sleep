import React, { useState, useEffect } from 'react';

const NamePopup = ({ onClose }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('login');
  const [error, setError] = useState('');
  
  const validateForm = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem('plutoName', name);
      localStorage.setItem('accessUnlockedTime', Date.now());
      
      setStatus('loading');
      
      // Simulate loading and unlock process
      setTimeout(() => {
        setStatus('unlocked');
      }, 1500);
    }
  };

  const handleClose = () => {
    onClose(name);
  };
 
  if (status === 'loading') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="bg-gray-900 p-8 rounded-lg w-80 text-white flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"/>
          <p className="text-lg font-semibold">Unlocking Access...</p>
        </div>
      </div>
    );
  }
 
  if (status === 'unlocked') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="bg-gray-900 p-8 rounded-lg w-80 text-white flex flex-col items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-16 h-16 text-green-500 mb-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold text-center">
            Premium Access Unlocked!
          </p>
          <p className="text-sm text-gray-400 mt-2 text-center">
            Enjoy unlimited access for the next 24 hours
          </p>
          <button
            onClick={handleClose}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            OK
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-gray-900 p-6 rounded-lg w-80 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Unlock Premium</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          > 
            Unlock Access
          </button>
        </form>
      </div>
    </div>
  );
};

// Wrapper component to handle local storage check
const PremiumAccessWrapper = ({ onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const accessUnlockedTime = localStorage.getItem('accessUnlockedTime');
    
    // Check if access is still valid (within 24 hours)
    if (!accessUnlockedTime || 
        (Date.now() - parseInt(accessUnlockedTime)) > 24 * 60 * 60 * 1000) {
      setShowPopup(true);
    }
  }, []);

  const handleClose = (name) => {
    setShowPopup(false);
    onClose(name);
  };

  return showPopup ? <NamePopup onClose={handleClose} /> : null;
};

export default PremiumAccessWrapper;