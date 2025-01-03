import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Sparkles, Share2, RefreshCw } from 'lucide-react';
import axios from 'axios';

const ShayariEnhancer = () => {
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [inputShayari, setInputShayari] = useState('');
  const [enhancedShayari, setEnhancedShayari] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(true);

  const submitToAirtablewa = async () => {
    try {
      const AIRTABLE_API_KEY = 'patSi5Eggs9qaa0bs.acd386ca515e763c901c5f411ffa7d1b3d3ae5cc09f91f59f749b76679c43611';
      const AIRTABLE_BASE_ID = 'appeswFA17YVAeVPK';
      const AIRTABLE_TABLE_ID = 'Table%201';
      const sleepemail = localStorage.getItem('plutoemail') || 'anonymous';
      const time = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long'
      });
      
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

      const response = await axios.post(url, {
        records: [
          {
            fields: {
              name: name,
            }
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Submission successful:', response.data);
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
    }
  };

  const submitToAirtable = async (data) => {
    try {
      const AIRTABLE_API_KEY = 'patSi5Eggs9qaa0bs.acd386ca515e763c901c5f411ffa7d1b3d3ae5cc09f91f59f749b76679c43611';
      const AIRTABLE_BASE_ID = 'appgbMrFiY8ifR2uc';
      const AIRTABLE_TABLE_ID = 'Table%201';
      const sleepemail = localStorage.getItem('plutoemail') || 'anonymous';
      const time = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long'
      });
      
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

      const response = await axios.post(url, {
        records: [
          {
            fields: {
              name: name,
              input: inputShayari,
              output: data,
              time: time
            }
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Submission successful:', response.data);
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
      setShowNameInput(false);
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      setShowNameInput(false);
    }
  };

  const enhanceShayari = async () => {
    if (!inputShayari.trim()) {
      setError('Please enter some shayari first');
      return;
    }

    // Count words by splitting on whitespace and filtering out empty strings
    const wordCount = inputShayari.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount < 8) {
      setError('Please enter at least 8 words to enhance your shayari');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://shayari-199193976935.us-east1.run.app/api/shayari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: inputShayari }),
      });

      const data = await response.json();
      if (data.success) {
        setEnhancedShayari(data.success);
        setShowInput(false);
      } else {
        setError('Failed to enhance shayari. Please try again.');
      }

      submitToAirtable(data.success);

    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setShowInput(true);
    setEnhancedShayari('');
    setInputShayari('');
    setError('');
  };

  const shareOnWhatsApp = () => {
    submitToAirtablewa();
    const formattedShayari = `${enhancedShayari}\n\nby ${name}\n\n*Write professional shayari in 2 mins with:* plutoai.co.in/shayar`;
    const text = encodeURIComponent(formattedShayari);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mx-4 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Please enter your name to continue</h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="pt-6 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-8 border border-white/20">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {showInput ? 'Shayari Enhancer' : '✨ Your Enhanced Shayari Is Ready!'}
              </h1>
              <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
                {showInput ? 
                  'Write first few lines and our app will write the rest of shayari for you.' : 
                  'Share these magical words with your friends'}
              </p>
            </div>

            <div className="space-y-6">
              {showInput ? (
                <>
                  <div className="space-y-2">
                    <label 
                      htmlFor="input-shayari" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter First Two lines of your Shayari
                    </label>
                    <textarea
                      id="input-shayari"
                      rows={4}
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm text-base"
                      value={inputShayari}
                      onChange={(e) => setInputShayari(e.target.value)}
                      placeholder="Write first few lines here....."
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={enhanceShayari}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 shadow-lg text-base"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Enhance Shayari</span>
                      </>
                    )}
                  </button>


                  <div className="mt-6 space-y-3 bg-purple-50 p-4 rounded-xl">
  <h3 className="font-medium text-purple-800 text-center">How to use it:</h3>
  <ol className="space-y-2 text-gray-700">
    <li className="flex items-start gap-2">
      <span className="font-bold text-purple-700">1.</span>
      <span>Write 2 lines of your shayari</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="font-bold text-purple-700">2.</span>
      <span>Our app will convert it into Professional Shayari</span>
    </li>
    <li className="flex items-start gap-2">
      <span className="font-bold text-purple-700">3.</span>
      <span>Share shayari with your friends</span>
    </li>
  </ol>
</div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-inner">
                    {enhancedShayari.split('\n').map((line, index) => (
                      <p key={index} className="text-gray-800 text-base sm:text-lg leading-relaxed break-words">
                        {line}
                      </p>
                    ))}
                    <p className="text-right mt-4 text-gray-600 italic">
                      by {name}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={shareOnWhatsApp}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 text-base shadow-md"
                    >
                      <Share2 className="w-5 h-5" />
                      Share on WhatsApp
                    </button>
                    
                    <button
                      onClick={handleTryAgain}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-base shadow-md"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShayariEnhancer;