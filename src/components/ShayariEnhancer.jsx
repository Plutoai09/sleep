import React, { useState, useRef, useEffect } from 'react';

import { Loader2, Sparkles, Share2, RefreshCw, ChevronRight } from 'lucide-react';
import axios from 'axios';

const ShayariEnhancer = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const [showNameInput, setShowNameInput] = useState(true);
  const [inputShayari, setInputShayari] = useState('');
  const [enhancedShayari, setEnhancedShayari] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(true);
  const outputRef = useRef(null);

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
      
      // Generate random 6 digit number
      const randomID = Math.floor(100000 + Math.random() * 900000);
      setId(randomID);
      
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
  
      const response = await axios.post(url, {
        records: [
          {
            fields: {
              name: name,
              input: inputShayari,
              output: data,
              time: time,
              ID: randomID // Convert to string as Airtable might expect string values
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
      return randomID; // Return the ID in case you need it elsewhere
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      throw error; // Re-throw the error for handling by the caller
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

    const wordCount = inputShayari.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount < 8) {
      setError('Please enter at least 8 words to enhance your shayari');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://shayarinextpluto-199193976935.us-east1.run.app/api/shayari', {
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
        // Scroll to top after state updates
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
    const formattedShayari = `*Checkout my shayari here:* plutoai.co.in/look?id=${id}`;
    const text = encodeURIComponent(formattedShayari);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Create Beautiful Shayari in 2 Minutes
            </h2>
            <p className="text-gray-600 text-sm">
              Your gateway to becoming a professional shayar
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600">1</span>
              </div>
              <p className="text-sm">Enter your name as the author of your shayari</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600">2</span>
              </div>
              <p className="text-sm">Write first two lines of your shayari</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600">3</span>
              </div>
              <p className="text-sm">Get AI-enhanced professional shayari instantly</p>
            </div>
          </div>

          {/* Name Input Form */}
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">
                Enter your name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name as author"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 bg-white/50"
                required
              />
              <p className="text-xs text-gray-500">
                Your name will appear as the author of your shayari
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Start Creating
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                {showInput ? 'Shayari Enhancer' : '✨ Your Shayari Is Ready!'}
              </h1>
              <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
                {showInput ? 
                  'Become a professional shayar in 2 minutes' : 
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
                <div className="space-y-4" ref={outputRef}>
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











      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Shayari Creator: Express Your Emotions
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Welcome to the future of shayari creation! Our AI-powered tool helps you craft beautiful romantic shayari, love poetry, and meaningful verses in Hindi, Urdu, and English. Whether you're looking for romantic shayari for your loved one or want to express your thoughts through attitude shayari, our platform makes it effortless.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-3">Popular Shayari Categories</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">♥️</span>
                    <span>Romantic Shayari in Hindi - Express your love in beautiful words</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✨</span>
                    <span>Love Shayari - Perfect for sharing with your special someone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">🌟</span>
                    <span>Two Line Shayari - Concise and impactful expressions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📝</span>
                    <span>Urdu Shayari - Classic poetic expressions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-3">Why Choose Our Shayari Maker</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">⚡</span>
                    <span>Create professional shayari in just 2 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">🎯</span>
                    <span>Multiple language support: Hindi, English, and Urdu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">💫</span>
                    <span>Perfect for both romantic and attitude shayari</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">🔄</span>
                    <span>Generate unlimited variations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Popular Shayari Styles</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Love Shayari in Hindi</h4>
                  <p className="text-sm text-gray-600">Perfect for expressing deep emotions and romantic feelings</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Punjabi Shayari</h4>
                  <p className="text-sm text-gray-600">Heartfelt expressions in the beautiful Punjabi language</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Sad Shayari</h4>
                  <p className="text-sm text-gray-600">Express your deepest emotions and feelings</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Attitude Shayari</h4>
                  <p className="text-sm text-gray-600">Show your confident and bold side</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Dosti Shayari</h4>
                  <p className="text-sm text-gray-600">Celebrate the beauty of friendship</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Love Poetry in Urdu</h4>
                  <p className="text-sm text-gray-600">Classic romantic expressions in Urdu</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                Our AI-powered shayari generator helps you create beautiful verses in multiple languages including Hindi, Urdu, and English. Whether you're looking for romantic shayari, love quotes, or attitude shayari, our tool makes it easy to express your feelings. Perfect for sharing on social media or with your loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>










    </div>
  );
};

export default ShayariEnhancer;