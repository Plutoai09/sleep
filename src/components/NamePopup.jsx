import React, { useState, useEffect } from 'react';

const NamePopup = ({ onClose }) => {
  const [name, setName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('plutoName');
    if (!storedName) {
      // Small delay for smoother entry animation
      setTimeout(() => setShowPopup(true), 100);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem('plutoName', name.trim());
      setShowPopup(false);
      if (onClose) onClose(name.trim());
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fadeIn" />
      <div className="relative bg-gradient-to-b from-[#1d1d1d] to-[#161616] w-[90%] max-w-[340px] rounded-3xl p-8 shadow-2xl animate-slideUp border border-white/5">
        {/* Glowing orb behind logo */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#64ffda]/10 blur-xl" />
        
        {/* Logo container */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-[#64ffda] via-[#1d3557] to-[#64ffda] p-[2px] rotate-180">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1d1d1d] to-[#161616] p-1 rotate-180">
            <div className="w-full h-full rounded-full bg-[#161616] flex items-center justify-center overflow-hidden">
              <img 
                src="/images/perfectmurder.png" 
                alt="Logo" 
                className="w-20 h-20 object-cover rounded-full transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#64ffda] via-white to-[#1d3557] bg-clip-text text-transparent">
           Enter your name to continue
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
           Unlimited audio drama for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              className="w-full bg-[#252525] text-white px-5 py-4 rounded-2xl outline-none border-2 border-transparent focus:border-[#64ffda]/30 transition-all duration-300 placeholder-gray-500"
              placeholder="Enter your name"
              required
            />
            <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#64ffda] via-[#64ffda]/50 to-[#1d3557] transform origin-left transition-all duration-500 ${hasFocus ? 'scale-x-100' : 'scale-x-0'}`} />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || isLoading}
            className={`w-full py-4 rounded-2xl text-white font-medium relative overflow-hidden group
              ${isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#64ffda] to-[#1d3557] hover:shadow-lg hover:shadow-[#64ffda]/20'
              }`}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative inline-flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Decorative corner gradients */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#64ffda]/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#1d3557]/20 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default NamePopup;