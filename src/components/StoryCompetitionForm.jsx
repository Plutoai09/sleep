import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Send, Book, Pencil, User, CheckCircle, Loader2, Info } from 'lucide-react';
import axios from 'axios';



const ThankYouScreen = () => (
  <div className="h-[95vh] flex flex-col items-center justify-center p-4">
    <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl p-6 max-w-lg w-full">
      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
        Thank You for Your Submission!
      </h2>
      <p className="text-gray-600">
        You have joined the waitlist.We will evaluate your idea and reach out to you with Yes or No in next 48 hours.
      </p>
    </div>
  </div>
);

const StoryCompetitionForm = () => {
  // ... all state and handlers remain the same ...


  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('facebook-pixel')) {
      return;
    }

    // Create and add Facebook Pixel base code
    const script = document.createElement('script');
    script.id = 'facebook-pixel';
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1749283992588246');
      fbq('track', 'PageView');
    `;
    
    document.head.appendChild(script);
  }, []);

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

  // ... all handlers remain the same ...
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
    <div className="h-[95vh] bg-gradient-to-b from-blue-50 to-purple-50 p-2">
      <div className="h-full w-full max-w-4xl mx-auto flex flex-col">
        {/* Progress Steps - Hidden on smallest screens */}
        <div className="hidden sm:block py-3">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center w-1/3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                  ${page >= step ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step === 1 && <Book className="h-4 w-4" />}
                  {step === 2 && <User className="h-4 w-4" />}
                  {step === 3 && <Pencil className="h-4 w-4" />}
                </div>
                <div className={`text-xs font-medium text-center ${page >= step ? 'text-purple-600' : 'text-gray-500'}`}>
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
        <div className="sm:hidden py-2">
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`w-2 h-2 rounded-full ${page >= step ? 'bg-purple-600' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white/90 backdrop-blur shadow-lg rounded-xl overflow-hidden flex flex-col">
          <div className="text-center py-4 px-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {page === 1 && "Join the Waitlist"}
              {page === 2 && "Tell Us About Yourself"}
              {page === 3 && "Share Your Story Idea"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {page === 1 && "Submit your details and hear back from us in 48 hours"}
              {page === 2 && "Help us know about you better"}
              {page === 3 && "Write what your story is about"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {page === 1 && (
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Book className="h-5 w-5" /> Invitation Criteria
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Invitations will be sent on a rolling basis, based on quality of your story idea</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">All genres are welcome - fantasy, mystery, romance, or literary fiction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2"></div>
                        <span className="text-gray-700">Hear back from us in the next 48 hours</span>
                      </li>
                    
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label className="text-base font-medium text-gray-900 mb-3 block">Select Your Language</label>
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
                          <span className="text-base capitalize">
                            {lang}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {page === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-base font-medium text-gray-900 block">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="text-base font-medium text-gray-900 block">Mobile Number</label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-base font-medium text-gray-900 block">Age</label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {page === 3 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5" /> Story Submission Guidelines
                    </h3>
                    <ul className="space-y-2 text-sm">
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
                    <label htmlFor="storyIdea" className="text-base font-medium text-gray-900 block">
                      Your Story Idea
                    </label>
                    <textarea
                      id="storyIdea"
                      name="storyIdea"
                      value={formData.storyIdea}
                      onChange={handleInputChange}
                      className="w-full h-40 text-base p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent leading-relaxed resize-none"
                      placeholder="Describe your story in less than 100 words"
                      required
                    />
                  
                  </div>
                </div>
              )}
            </form>
          </div>

<div className="px-4 pt-4 pb-8 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center">
              {page > 1 && (
                <button
                  type="button"
                  onClick={() => setPage(page - 1)}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              )}
              
              {page < 3 && (
                <button
                  type="button"
                  onClick={() => setPage(page + 1)}
                  disabled={page === 1 ? !canProceedToPage2 : !canProceedToPage3}
                  className={`flex items-center gap-2 h-10 px-4 rounded-lg font-medium ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-colors
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
                  className={`flex items-center gap-2 h-10 px-4 rounded-lg font-medium ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-colors
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