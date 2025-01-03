import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Send, Book, Pencil, User, CheckCircle, Loader2, Info } from 'lucide-react';
import axios from 'axios';

const ThankYouScreen = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl p-8 max-w-lg w-full">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
        Thank You for Your Submission!
      </h2>
      <p className="text-gray-600">
        Your story has been successfully submitted to our competition. We will reach out to shortlisted participants!
      </p>
    </div>
  </div>
);

const StoryCompetitionForm = () => {
  const [page, setPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    language: '',
    name: '',
    mobile: '',
    age: '',
    storyIdea: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (value) => {
    setFormData(prev => ({
      ...prev,
      language: value
    }));
  };

  const submitToAirtable = async () => {
    try {
      setIsSubmitting(true);
      const AIRTABLE_API_KEY = 'patSi5Eggs9qaa0bs.acd386ca515e763c901c5f411ffa7d1b3d3ae5cc09f91f59f749b76679c43611';
      const AIRTABLE_BASE_ID = 'appKxtR9mPLhnr0qj';
      const AIRTABLE_TABLE_ID = 'Table%201';
      
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

      const response = await axios.post(url, {
        records: [
          {
            fields: {
              name: formData.name,
              age: formData.age,
              mobile: formData.mobile,
              language: formData.language,
              story: formData.storyIdea
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
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      alert('There was an error submitting your story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitToAirtable();
  };

  const canProceedToPage2 = formData.language !== '';
  const canProceedToPage3 = formData.name !== '' && formData.mobile !== '' && formData.age !== '';

  if (isSubmitted) {
    return <ThankYouScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-0 sm:p-4 md:p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Progress Steps - Hidden on smallest screens */}
        <div className="hidden sm:block mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center w-1/3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 
                  ${page >= step ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step === 1 && <Book className="h-4 w-4 md:h-5 md:w-5" />}
                  {step === 2 && <User className="h-4 w-4 md:h-5 md:w-5" />}
                  {step === 3 && <Pencil className="h-4 w-4 md:h-5 md:w-5" />}
                </div>
                <div className={`text-xs md:text-sm font-medium text-center ${page >= step ? 'text-purple-600' : 'text-gray-500'}`}>
                  {step === 1 && "Choose Language"}
                  {step === 2 && "Your Details"}
                  {step === 3 && "Story Idea"}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded">
              <div 
                className="absolute h-1 bg-purple-600 rounded transition-all duration-300"
                style={{ width: `${((page - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="sm:hidden mb-4 px-4 pt-4">
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`w-2.5 h-2.5 rounded-full ${page >= step ? 'bg-purple-600' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur shadow-lg sm:shadow-2xl rounded-none sm:rounded-xl overflow-hidden">
          <div className="text-center pb-4 pt-6 px-4 sm:pt-8 sm:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {page === 1 && "Story Idea Competition"}
              {page === 2 && "Tell Us About Yourself"}
              {page === 3 && "Share Your Story"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              {page === 1 && "Join our story writing competition and let your imagination soar"}
              {page === 2 && "Help us know about you better"}
              {page === 3 && "Write what your story is about"}
            </p>
          </div>

          <div className="p-4 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {page === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-purple-100">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                      <Book className="h-5 w-5" /> Competition Guidelines
                    </h3>
                    <ul className="space-y-3 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Submit your story idea in few lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">All genres are welcome - fantasy, mystery, romance, or literary fiction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Prizes worth Rs. 10000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">One submission per participant</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                    <label className="text-base sm:text-lg font-medium text-gray-900 mb-4 block">Select Your Language</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['english', 'hindi'].map((lang) => (
                        <label
                          key={lang}
                          className={`relative flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-colors
                            ${formData.language === lang ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
                        >
                          <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={formData.language === lang}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-base sm:text-lg capitalize">
                            {lang}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {page === 2 && (
                <div className="space-y-6">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-base sm:text-lg font-medium text-gray-900 block">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-11 sm:h-12 px-3 text-base sm:text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="text-base sm:text-lg font-medium text-gray-900 block">Mobile Number</label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full h-11 sm:h-12 px-3 text-base sm:text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-base sm:text-lg font-medium text-gray-900 block">Age</label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full h-11 sm:h-12 px-3 text-base sm:text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {page === 3 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-purple-100">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5" /> Story Submission Guidelines
                    </h3>
                    <ul className="space-y-3 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Tell us what is the story about in few lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Give a small description of the plot</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Write in your preferred language - English or Hindi</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="storyIdea" className="text-base sm:text-lg font-medium text-gray-900 block">
                      Your Story Idea
                    </label>
                    <textarea
                      id="storyIdea"
                      name="storyIdea"
                      value={formData.storyIdea}
                      onChange={handleInputChange}
                      className="w-full min-h-[200px] sm:min-h-[300px] text-base sm:text-lg p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent leading-relaxed resize-y"
                      placeholder="Once upon a time..."
                      required
                    />
                  </div>

                
                </div>
              )}
            </form>
          </div>

          <div className="p-4 sm:p-8 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {page > 1 && (
                <button
                  type="button"
                  onClick={() => setPage(page - 1)}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              )}
              
              {page < 3 && (
                <button
                  type="button"
                  onClick={() => setPage(page + 1)}
                  disabled={page === 1 ? !canProceedToPage2 : !canProceedToPage3}
                  className={`flex items-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-lg font-medium ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-colors
                    ${page === 1 ? (!canProceedToPage2 ? 'opacity-50 cursor-not-allowed' : '') : (!canProceedToPage3 ? 'opacity-50 cursor-not-allowed' : '')}`}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
              
              {page === 3 && (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!formData.storyIdea || isSubmitting}
                  className={`flex items-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-lg font-medium ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-colors
                    ${(!formData.storyIdea || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Story <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCompetitionForm;