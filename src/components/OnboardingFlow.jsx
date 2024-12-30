import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Book, Youtube, Users, Briefcase, Heart, Sparkles } from 'lucide-react';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPersonaQuestions, setShowPersonaQuestions] = useState(false);

  useEffect(() => {
    const authCode = localStorage.getItem('authCode');
    const plutoemail = localStorage.getItem('plutoemail');
    
    if (authCode !== 'pluto_success' && !plutoemail) {
      navigate('/login');
    }
  }, []);

  const categories = [
  
    {
      id: 'sleep',
      title: 'Frozen rails',
      icon: Book,
      path: '/player',
      image: '/images/frozen.png',
      chaptername: 'Journey Through the Frozen Rails',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter0.mp3' 
    },
    {
      id: 'sleep',
      title: 'New Zealand Highlands',
      icon: Book,
      path: '/player',
      image: '/images/newzealand.png',
      chaptername: 'New Zealand Highlands',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter1.mp3' 
    },
    {
      id: 'sleep',
      title: 'Blue Gold',
      icon: Book,
      path: '/player',
      image: '/images/blue.png',
      chaptername: 'Blue Gold',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter2.mp3' 
    },
    {
      id: 'sleep',
      title: 'Greek Story',
      icon: Book,
      path: '/player',
      image: '/images/greek.png',
      chaptername: 'Blue Gold',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter3.mp3' 
    },
    {
      id: 'sleep',
      title: 'Night in Paris',
      icon: Book,
      path: '/player',
      image: '/images/night.png',
      chaptername: 'Night in Paris',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter4.mp3' 
    },
    {
      id: 'sleep',
      title: 'Space Journey',
      icon: Book,
      path: '/player',
      image: '/images/space.png',
      chaptername: 'Space Journey',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter5.mp3' 
    },
    {
      id: 'sleep',
      title: 'Travel & Dream',
      icon: Book,
      path: '/player',
      image: '/images/travel.png',
      chaptername: 'Travel & Dream',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter6.mp3' 
    },
    {
      id: 'sleep',
      title: 'Twilight Town',
      icon: Book,
      path: '/player',
      image: '/images/twilight.png',
      chaptername: 'Twilight Town',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter7.mp3' 
    },
    {
      id: 'sleep',
      title: 'Viking Village',
      icon: Book,
      path: '/player',
      image: '/images/viking.png',
      chaptername: 'Viking Village',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter8.mp3' 
    },
    {
      id: 'sleep',
      title: 'End of the day',
      icon: Book,
      path: '/player',
      image: '/images/end.png',
      chaptername: 'End of the day',
      url: 'https://storage.googleapis.com/plutoai/user_sleep_chapter9.mp3' 
    },

    {
      id: 'sleep',
      title: 'Tide of Love',
      icon: Book,
      path: '/player',
      image: '/images/tide.png',
      chaptername: 'End of the day',
      url: 'https://storage.googleapis.com/plutoai/Tide%20of%20Love.mp3' 
    },

    {
      id: 'sleep',
      title: 'Journey to Dinoland',
      icon: Book,
      path: '/player',
      image: '/images/dino.png',
      chaptername: 'End of the day',
      url: 'https://storage.googleapis.com/plutoai/Journey%20to%20Dino%20era.mp3' 
    },

    {
      id: 'sleep',
      title: 'Journey into the sea',
      icon: Book,
      path: '/player',
      image: '/images/sea.png',
      chaptername: 'End of the day',
      url: 'https://storage.googleapis.com/plutoai/Journey%20under%20the%20sea.mp3' 
    },

    
    {
      id: 'sleep',
      title: 'Sherlock adventure',
      icon: Book,
      path: '/player',
      image: '/images/sherlock.png',
      chaptername: 'End of the day',
      url: 'https://storage.googleapis.com/plutoai/Sherlock.mp3' 
    },

    {
      id: 'sleep',
      title: 'Around the world in 80 days',
      icon: Book,
      path: '/player',
      image: '/images/around.png',
      chaptername: 'End of the day',
      url: 'https://storage.googleapis.com/plutoai/Around%20the%20world.mp3' 
    },
  ];

  // Create learning categories by duplicating and modifying the IDs
  const horrorCategories = [  
  {
    id: 'youtube',
    title: 'Abandoned Amusement Park',
    icon: Youtube,
    path: '/player',
    image: '/images/amusement.png',
    url: 'https://storage.googleapis.com/plutoai/Amusement%20Park.mp3' 
  },

  {
    id: 'youtube',
    title: 'Hidden room in my house',
    icon: Youtube,
    path: '/player',
    image: '/images/hidden.png',
    url: 'https://storage.googleapis.com/plutoai/Hidden%20room%20in%20house.mp3' 
  },

  {
    id: 'youtube',
    title: 'Mysterious House',
    path: '/player',
    image: '/images/sudden.png',
    url: 'https://storage.googleapis.com/plutoai/House%20in%20field.mp3' 
  },

  {
    id: 'youtube',
    title: 'Chilling Night Shift',
    icon: Youtube,
    path: '/player',
    image: '/images/nightshift.png',
    url: 'https://storage.googleapis.com/plutoai/Night%20Shift.mp3' 
  },

  {
    id: 'youtube',
    title: 'No escape town',
    icon: Youtube,
    path: '/player',
    image: '/images/nophotos.png',
    url: 'https://storage.googleapis.com/plutoai/No%20Photos%20allowed%20town.mp3' 
  },

  {
    id: 'youtube',
    title: 'The night without stars',
    icon: Youtube,
    path: '/player',
    image: '/images/stars.png',
    url: 'https://storage.googleapis.com/plutoai/No%20Stars%20%26%20Moon.mp3' 
  },
  {
    id: 'youtube',
    title: 'The security guard',
    icon: Youtube,
    path: '/player',
    image: '/images/security.png',
    url: 'https://storage.googleapis.com/plutoai/Security%20guard.mp3' 
  },
  {
    id: 'youtube',
    title: 'The Mystery Package',
    icon: Youtube,
    path: '/player',
    image: '/images/strange.png',
    url: 'https://storage.googleapis.com/plutoai/Strange%20Package.mp3' 
  },
  {
    id: 'youtube',
    title: 'Please stop the train',
    icon: Youtube,
    path: '/player',
    image: '/images/train.png',
    url: 'https://storage.googleapis.com/plutoai/Train%20that%20hasn\'t%20stopped.mp3' 
  },

  {
    id: 'youtube',
    title: 'Raining Town',
    icon: Youtube,
    path: '/player',
    image: '/images/wild.png',
    url: 'https://storage.googleapis.com/plutoai/Weird%20Rain.mp3' 
  },

]









const learningCategories = [  {
  id: 'conversation',
  title: 'Conversation',
  icon: Users,
  path: null,
  image: '/images/artof.png'
},
{
  id: 'youtube',
  title: 'Youtube',
  icon: Youtube,
  path: '/youtube',
  image: '/images/ytsecret.png'
},
{
  id: 'youtube',
  title: 'Ancient Human History',
  icon: Youtube,
  path: '/player',
  image: '/images/ancient.png',
  url: 'https://storage.googleapis.com/plutoai/Ancient%20human.mp3' 
},

{
  id: 'youtube',
  title: 'The Big Bang',
  icon: Youtube,
  path: '/player',
  image: '/images/big.png',
  url: 'https://storage.googleapis.com/plutoai/Big%20Bang.mp3' 
},

{
  id: 'youtube',
  title: 'Philosophy 101',
  icon: Youtube,
  path: '/player',
  image: '/images/philosophy.png',
  url: 'https://storage.googleapis.com/plutoai/Biggest%20ideas%20in%20philosophy.mp3' 
},

{
  id: 'youtube',
  title: 'The Cold War',
  icon: Youtube,
  path: '/player',
  image: '/images/cold.png',
  url: 'https://storage.googleapis.com/plutoai/Cold%20war.mp3' 
},

{
  id: 'youtube',
  title: 'Exploring Space',
  icon: Youtube,
  path: '/player',
  image: '/images/exploring.png',
  url: 'https://storage.googleapis.com/plutoai/Exploring%20Space.mp3' 
},

{
  id: 'youtube',
  title: 'Paradoxes of Life',
  icon: Youtube,
  path: '/player',
  image: '/images/life.png',
  url: 'https://storage.googleapis.com/plutoai/Life%20paradox.mp3' 
},
{
  id: 'youtube',
  title: 'Making of Stalin',
  icon: Youtube,
  path: '/player',
  image: '/images/stalin.png',
  url: 'https://storage.googleapis.com/plutoai/stalin.mp3' 
},
{
  id: 'youtube',
  title: 'Stoicism 101',
  icon: Youtube,
  path: '/player',
  image: '/images/stoicism.png',
  url: 'https://storage.googleapis.com/plutoai/stoicism.mp3' 
},



]








  const personaOptions = [
    {
      id: 'jobs',
      title: 'I want to learn for Jobs interview',
      icon: Briefcase,
      category: 'Category 3'
    },
    {
      id: 'professional',
      title: 'I am a working professional looking to improve formal conversation',
      icon: Users,
      category: 'Category 4'
    },
    {
      id: 'personal',
      title: 'I want to improve my personal relationships',
      icon: Heart,
      category: 'Category 2'
    },
    {
      id: 'general',
      title: 'I want general self improvement of conversation skills',
      icon: Sparkles,
      category: 'Category 1'
    }
  ];

  const handleCategorySelect = (category) => {
    console.log("category HERE")
    localStorage.setItem('firstLoad', 'true');
    localStorage.setItem('url',category.url);
    localStorage.setItem('title',category.title);
    setSelectedCategory(category);
    submitToAirtable(category.title)
    if (category.path) {
      navigate(category.path);
    } else {
      setShowPersonaQuestions(true);
    }
  };







  const submitToAirtable = async (title) => {
    try {
      // Airtable API details (replace with your actual values)
      const AIRTABLE_API_KEY = 'patprnTG99hS6uQWv.b752084329e8723bc5bb5d8ff5abb7850004127579b197cc7ed4236e565f3305';
      const AIRTABLE_BASE_ID = 'appxGg8YmAsauJHIV';
      const AIRTABLE_TABLE_ID = 'Table%201';
      const sleepemail = localStorage.getItem('plutoemail') || 'anonymous';
      const time =new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long'
      });
      
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

      const response = await axios.post(url, {
        records: [
          {
            fields: {
              email: sleepemail,
              Chapter: title,
              Date:time
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
      // Additional success handling (e.g., navigation, showing success message)
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      
    }
  };




  const handlePersonaSelect = (persona) => {
    localStorage.setItem('persona', persona.category);
    navigate('/artofconversation');
  };

  const CategoryGrid = ({ items, sectionTitle, sectionSubheading }) => (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white pl-1">{sectionTitle}</h2>
        {sectionSubheading && (
          <p className="text-sm text-gray-400 pl-1">{sectionSubheading}</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((category) => (
          <div key={category.id} className="flex flex-col items-center space-y-3">
            <button
              onClick={() => handleCategorySelect(category)}
              className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 shadow-md shadow-gray-900/50 hover:shadow-xl hover:shadow-gray-900/70 transition-all"
            >
              <div className="relative h-full w-full">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-900">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                </div>
              </div>
            </button>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-300 text-xs">{category.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showPersonaQuestions ? (
          // Persona Questions Section
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                What describes you the best?
              </h1>
              <p className="text-gray-400 text-sm">
                Select the option that best matches your goals
              </p>
            </div>

            <div className="space-y-4">
              {personaOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlePersonaSelect(option)}
                  className="w-full flex items-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-all group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600 transition-colors">
                      <option.icon className="w-6 h-6 text-gray-300" />
                    </div>
                    <span className="text-base font-medium text-gray-200 text-left">
                      {option.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPersonaQuestions(false)}
              className="mx-auto mt-6 flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              ← Back to categories
            </button>
          </div>
        ) : (
          // Categories and Learning Sections
          <div className="space-y-16">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Select your story
              </h1>
              <p className="text-gray-400 text-sm">
                Select a story to begin your journey
              </p>
            </div>

            {/* Categories Section */}


            <CategoryGrid items={categories} sectionTitle="Soothing Sleep Stories"  sectionSubheading ="Soothing voices for a restful sleep"/>

            <CategoryGrid items={horrorCategories} sectionTitle="Gentle Horror Bedtime Stories"  sectionSubheading ="Engaging stories to escape overthinking."/>
           
            {/* Learning Section */}
            <CategoryGrid items={learningCategories} sectionTitle="Non-Fiction Bedtime Stories"  sectionSubheading ="Fascinating facts & stories" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;