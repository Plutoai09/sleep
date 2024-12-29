import React from 'react';

const TnC = () => {
  return (
    <div className="w-full h-screen max-h-[800px] flex flex-col overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="flex-1 relative w-full h-full">
        <iframe 
          src="https://getpluto.in/terms"
          className="absolute inset-0 w-full h-full border-none"
          title="Pluto Terms and Conditions"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TnC;