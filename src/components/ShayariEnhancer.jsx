import React, { useState } from 'react';
import { Loader2, Sparkles, Share2 } from 'lucide-react';

const ShayariEnhancer = () => {
  const [inputShayari, setInputShayari] = useState('');
  const [enhancedShayari, setEnhancedShayari] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const enhanceShayari = async () => {
    if (!inputShayari.trim()) {
      setError('Please enter some shayari first');
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
      } else {
        setError('Failed to enhance shayari. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(enhancedShayari);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shayari Enhancer
              </h1>
              <p className="text-center text-gray-600 mt-2">Transform your thoughts into beautiful verses</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label 
                  htmlFor="input-shayari" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Your Shayari
                </label>
                <textarea
                  id="input-shayari"
                  rows={4}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm"
                  value={inputShayari}
                  onChange={(e) => setInputShayari(e.target.value)}
                  placeholder="Type your shayari here..."
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
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
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

              {enhancedShayari && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Enhanced Shayari
                    </h2>
                    <button
                      onClick={shareOnWhatsApp}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <Share2 className="w-4 h-4" />
                      Share on WhatsApp
                    </button>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-inner">
                    {enhancedShayari.split('\n').map((line, index) => (
                      <p key={index} className="text-gray-800 text-lg leading-relaxed">
                        {line}
                      </p>
                    ))}
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