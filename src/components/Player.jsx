
import React, { useState, useEffect, useRef } from "react";
import "./ui/ripple.css";
import { useParams, useNavigate } from "react-router-dom";
import { Home } from "lucide-react"; // Add Home icon import


import PWAInstallPrompt from"./PWAInstallPrompt.jsx";
import ElevenLabsConversationyt from "./ElevenLabsConversationyt.jsx";
import axios from 'axios';
import {
  Rewind,
  FastForward,
  Play,
  Pause,
  MessageCircle,
  Phone,
  X,
  Loader,
  Key,
  SkipBack,
  SkipForward
} from "lucide-react";
const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full max-h-[100vh] sm:max-w-[375px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col mb-6 relative animate-pulse">
      {/* Author Image Skeleton */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 border-4 border-white" />
      </div>

      {/* Book Image Skeleton */}
      <div className="relative w-full pt-[50%]">
        <div className="absolute inset-0 bg-gray-200" />
      </div>

      {/* Book Info Card Skeleton */}
      <div className="relative -mt-10 px-6 z-10">
        <div className="bg-white rounded-[20px] p-4 shadow-lg">
          <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded-full w-1/2 mx-auto mb-3" />
          <div className="flex justify-center">
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Chapters List Skeleton */}
      <div className="flex-1 min-h-0 px-6 mt-4 mb-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="py-2 sm:py-2.5 border-b border-gray-200">
            <div className="px-2">
              <div className="h-3 bg-gray-200 rounded-full w-16 mb-1" />
              <div className="h-4 bg-gray-200 rounded-full w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls Section Skeleton */}
      <div className="bg-gray-100 shadow-lg rounded-t-[30px] p-4">
        <div className="flex justify-center mb-3">
          <div className="h-10 w-32 bg-gray-200 rounded-full" />
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-12 w-12 bg-gray-200 rounded-full" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center">
          <div className="h-4 w-8 bg-gray-200 rounded-full" />
          <div className="flex-grow mx-2">
            <div className="h-1 w-full bg-gray-200 rounded-full" />
          </div>
          <div className="h-4 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const Player = () => {
  const navigate = useNavigate();
  
  const name = "user"
  const [bookName, setBookName] = useState("sleep");

  const Name = "sleep"
  // Group all useState declarations together
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [showPWAPrompt, setShowPWAPrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [authorImageSrc, setAuthorImageSrc] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [persona, setPersona] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('controls');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerAudioSrc, setAnswerAudioSrc] = useState("");
  const [isAnswerPlaying, setIsAnswerPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
  const [lastPlayedTime, setLastPlayedTime] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isChapterLoading, setIsChapterLoading] = useState(false);


  const answerAudioRef = useRef(null);
  const afterAnswerAudioRef = useRef(null);

  const getFullAudioUrl = (path) => {
    console.log(path)
    const baseUrl = "https://contractus.co.in//";
    return `${baseUrl}${path}`;
  };


  const handlePreviousChaptermain = () => {
    if (currentChapter > 0) {
      playChapter(currentChapter - 1);
    }
  };




  const handleNextChaptermain = () => {
    if (currentChapter < chapters.length - 1) {
      playChapter(currentChapter + 1);
    }
  };


  useEffect(() => {
    // Add custom CSS to override widget styles and remove shadow
    const style = document.createElement('style');
    style.textContent = `
      elevenlabs-convai {
        position: static !important;
        bottom: auto !important;
        left: auto !important;
        margin: 0 !important;
        transform: none !important;
      }
      ._poweredBy_4a2g8_280 { 
        box-shadow: none !important; /* Disable shadow */
        background: transparent !important; /* Optional, if shadow overlay affects background */
      }


    `;
    document.head.appendChild(style);
  
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  


  



  useEffect(() => {
    const authCode = localStorage.getItem('authCode');
    const plutoemail = localStorage.getItem('plutoemail');
    
    if (authCode !== 'pluto_success' && !plutoemail) {
      navigate('/login');
    }
  }, []);



  const preloadImages = (imageSrcs) => {
    return Promise.all(
      imageSrcs.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`);
              resolve(src); // Still resolve to not block loading
            };
            img.src = src;
          })
      )
    );
  };


  useEffect(() => {
    const fetchAudiobook = async () => {
      try {
     
   
        let updatedBookName = "sleep"; // Default to existing bookName

      
    
        // Update the bookName state if it changed
        console.log(updatedBookName)
        console.log(name)
        const response = await fetch("https://contractus.co.in/api/audiobook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, updatedBookName }),
        });


        const audioBooks = [
          { title: localStorage.getItem('title'), url:  localStorage.getItem('url') },
          
        ];
        



        if (!response.ok) {
          throw new Error("Failed to fetch audiobook");
        }

        const data = await response.json();

    

        console.log(data)
        if (data.chapters && data.chapters.length > 0) {
          setAudioSrc(audioBooks[0].url);
        } else {
          throw new Error("No chapters found in the response");
        }

        // Preload critical images before setting isLoading to false
        const imagesToPreload = [
          data.imageSrc,
          data.authorImageSrc,
          "/images/bg.png",
           "/images/sleep.jpg",
           "/images/star.webp",
          "/images/bg.png" // Preload video as well
        ].filter(Boolean);

        await preloadImages(imagesToPreload);

        setImageSrc(data.imageSrc);
        setAuthorImageSrc(data.authorImageSrc);
        setAuthorName(data.authorName);
     
        setChapters(audioBooks);
        setError("");
      } catch (error) {
        console.error("Error fetching audiobook:", error);
        setError("Failed to load audiobook. Please try again.");
      } finally {
        // Set isLoading to false only after all critical assets are loaded
        setIsLoading(false);
      }
    };
    
    fetchAudiobook();
  }, [name, bookName]);



 // Add these new states at the top with your other state declarations
const [isBuffering, setIsBuffering] = useState(false);
const [loadedProgress, setLoadedProgress] = useState(0);


const configureAudio = (audio) => {
  if ('mozAutoplayEnabled' in audio) {
    audio.mozPreservesPitch = false;
    audio.bufferSize = 65536;
  }

  audio.preload = "auto";
  
  if ('webkitAudioContext' in window) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    const buffer = audioContext.createBuffer(2, 262144, audioContext.sampleRate);
    
    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(audioContext.destination);
    source.connect(audioContext.destination);
  }

  return audio;
};



useEffect(() => {
  if (audioSrc) {
    let audioObj = new Audio();
    audioObj.crossOrigin = "anonymous";

    const handleProgress = () => {
      if (audioObj.buffered.length > 0) {
        const bufferedEnd = audioObj.buffered.end(audioObj.buffered.length - 1);
        const duration = audioObj.duration;
        setLoadedProgress((bufferedEnd / duration) * 100);

        if (bufferedEnd < duration) {
          const timeRangeRequest = new TimeRanges();
          const nextChunkStart = bufferedEnd;
          const nextChunkEnd = Math.min(duration, bufferedEnd + 300);
          timeRangeRequest.start = nextChunkStart;
          timeRangeRequest.end = nextChunkEnd;
          
          if ('webkitAudioContext' in window) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContext.resume();
          }
        }
      }
    };

    const setupAudioEvents = () => {
      audioObj.addEventListener('progress', handleProgress);
      audioObj.addEventListener('waiting', () => setIsBuffering(true));
      audioObj.addEventListener('canplaythrough', () => setIsBuffering(false));
      
      audioObj.addEventListener('loadedmetadata', () => {
        setDuration(audioObj.duration);
        
        if ('fastSeek' in audioObj) {
          audioObj.fastSeek(0);
        } else {
          audioObj.currentTime = 0;
        }
      });
      
      audioObj.addEventListener('timeupdate', () => {
        setCurrentTime(audioObj.currentTime);
        
        if (audioObj.buffered.length > 0) {
          const bufferedEnd = audioObj.buffered.end(audioObj.buffered.length - 1);
          if (bufferedEnd - audioObj.currentTime < 300) {
            handleProgress();
          }
        }
      });
    };

    const initializeAudio = async () => {
      try {
        setIsBuffering(true);
        audioObj = configureAudio(audioObj);
        setupAudioEvents();
        
        audioObj.timeout = 30000;
        audioObj.src = audioSrc;
        await audioObj.load();
        setAudioElement(audioObj);
      } catch (error) {
        console.error('Error initializing audio:', error);
        setError(`Failed to initialize audio: ${error.message}`);
      }
    };

    initializeAudio();

    return () => {
      audioObj.removeEventListener('progress', handleProgress);
      audioObj.removeEventListener('waiting', () => setIsBuffering(true));
      audioObj.removeEventListener('canplaythrough', () => setIsBuffering(false));
      audioObj.removeEventListener('loadedmetadata', () => {});
      audioObj.removeEventListener('timeupdate', () => {});
      
      if ('webkitAudioContext' in window) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.close();
      }
      
      audioObj.pause();
      audioObj.src = '';
      audioObj.load();
    };
  }
}, [audioSrc]);


  useEffect(() => {
    if (audioElement) {
      const handleEnded = async () => {
        // Check if there's a next chapter available
        if (currentChapter < chapters.length - 1) {
          try {
            // Get email from localStorage for analytics
            const email = localStorage.getItem('plutoytemail') || 'anonymous';
             
            // Log the chapter transition
            submitToAirtable();

            console.log(`Chapter ${currentChapter} ended, auto-playing chapter ${currentChapter + 1}`);
            
            // Set loading state
            setIsChapterLoading(true);

            // Clean up current audio
            audioElement.pause();
            audioElement.src = '';
            audioElement.load();

            // Create and set up new audio for next chapter
            const nextChapter = currentChapter + 1;
            const newAudio = new Audio(chapters[nextChapter].url);

            // Set up promise to handle audio loading
            const audioLoadPromise = new Promise((resolve, reject) => {
              newAudio.oncanplaythrough = resolve;
              newAudio.onerror = reject;
            });

            // Reset state for new chapter
            setCurrentTime(0);
            setDuration(0);
            
            // Wait for audio to be ready
            await audioLoadPromise;
            
            // Update state with new chapter
            setCurrentChapter(nextChapter);
            setAudioElement(newAudio);
            
            // Start playing new chapter
            await newAudio.play();
            setIsPlaying(true);

          } catch (error) {
            console.error("Error during chapter transition:", error);
            setError(`Failed to auto-play next chapter. Error: ${error.message}`);
            setIsPlaying(false);
          } finally {
            setIsChapterLoading(false);
          }
        } else {
          // No more chapters available
          console.log("Reached end of audiobook");
          setIsPlaying(false);
        }
      };

      // Add event listener for chapter end
      audioElement.addEventListener("ended", handleEnded);

      // Cleanup function
      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioElement, currentChapter, chapters]);


  useEffect(() => {
    if (answerAudioSrc) {
      const fullAudioUrl = getFullAudioUrl(answerAudioSrc);
      console.log("Full answer audio URL:", fullAudioUrl);

      fetch(fullAudioUrl, { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            setupAudio(fullAudioUrl);
          } else {
            throw new Error(
              `Audio file not found: ${response.status} ${response.statusText}`
            );
          }
        })
        .catch((error) => {
          console.error("Error checking audio file:", error);
          setError(`Failed to load answer audio: ${error.message}`);
        });
    }
  }, [answerAudioSrc]);



  const submitToAirtabletime = async (timea) => {
    console.log("ghanti "+ timea)
    try {
      // Airtable API details (replace with your actual values)
      const AIRTABLE_API_KEY = 'patGVnCpojLKL6Bd7.5d0dc21c0d5b4ce2b7d00c2620f8a2dcd63b238bc3b1236afa0c8704f40ba927';
      const AIRTABLE_BASE_ID = 'appIHEySY3eMIzNiy';
      const AIRTABLE_TABLE_ID = 'Table%201';
      const sleepemail = localStorage.getItem('plutoemail') || 'anonymous';
     
      
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

      const response = await axios.post(url, {
        records: [
          {
            fields: {
              email: sleepemail,
              time: timea,
              chapter: localStorage.getItem('title')
             
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





  const submitToAirtable = async () => {
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
              Chapter: currentChapter+1,
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


  
  const submitToAirtableB = async (index) => {
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
              Chapter: index,
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





  const setupAudio = (url) => {
    if (answerAudioRef.current) {
      answerAudioRef.current.pause();
    }

    // Initialize after-answer audio
    afterAnswerAudioRef.current = new Audio("/audios/afteranswer.mp3");
    afterAnswerAudioRef.current.onerror = (e) => {
      console.error("After-answer audio error:", e);
      setError(`Failed to load after-answer audio. Error: ${e.type}`);
    };

    answerAudioRef.current = new Audio(url);
    answerAudioRef.current.onerror = (e) => {
      console.error("Answer audio error:", e);
      setError(`Failed to load answer audio. Error: ${e.type}`);
    };

    answerAudioRef.current.addEventListener("loadedmetadata", () => {
      console.log("Audio metadata loaded successfully");
    });

    answerAudioRef.current.addEventListener("canplaythrough", () => {
      console.log("Audio can play through");
      playAnswerAudio();
    });

    answerAudioRef.current.addEventListener("ended", () => {
      playAfterAnswerAudio();
    });

    afterAnswerAudioRef.current.addEventListener("ended", () => {
      setIsAnswerPlaying(false);
      resumeMainAudio();
    });
  };

  const playAnswerAudio = () => {
    if (answerAudioRef.current) {
      answerAudioRef.current
        .play()
        .then(() => {
          setIsAnswerPlaying(true);
        })
        .catch((e) => {
          console.error("Failed to play answer audio:", e);
          setError(`Failed to play answer audio. Error: ${e.message}`);
        });
    }
  };

  const progressBarRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  
  // Replace the handleSeek function with this optimized version

  const handleSeek = async (event) => {
    if (!audioElement || !progressBarRef.current) return;
    
    const wasPlaying = !audioElement.paused;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = event.clientX || (event.touches && event.touches[0].clientX);
    const seekPosition = (clientX - rect.left) / rect.width;
    const seekTime = seekPosition * duration;
  
    try {
      audioElement.pause();
      audioElement.currentTime = seekTime;
      setCurrentTime(seekTime);
      
      if (wasPlaying) {
        await audioElement.play();
      }
    } catch (error) {
      console.error('Error during seek:', error);
      setError(`Seek failed: ${error.message}`);
    }
  };




  
  // Simplify the progress bar interaction
  const handleProgressBarInteraction = (e) => {
    e.preventDefault();
    handleSeek(e);
  
    const handleMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      handleSeek(moveEvent);
    };
  
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  };
  
  

  const playAfterAnswerAudio = () => {
    if (afterAnswerAudioRef.current) {
      afterAnswerAudioRef.current
        .play()
        .then(() => {
          console.log("Playing after-answer audio");
        })
        .catch((e) => {
          console.error("Failed to play after-answer audio:", e);
          setError(`Failed to play after-answer audio. Error: ${e.message}`);
          // If after-answer audio fails, still continue to main audio
          setIsAnswerPlaying(false);
          resumeMainAudio();
        });
    }
  };

  const resumeMainAudio = () => {
    if (audioElement) {
      audioElement.currentTime = lastPlayedTime;
      audioElement.play().catch((e) => {
        console.error("Failed to resume main audio:", e);
        setError(`Failed to resume main audio. Error: ${e.message}`);
      });
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setLastPlayedTime(audioElement.currentTime);
      } else {
        audioElement.play().catch((e) => {
          console.error("Failed to play audio:", e);
          setError(`Failed to play audio. Error: ${e.message}`);
        });
      }
      setIsPlaying(!isPlaying);
    } else if (chapters.length > 0) {
      playChapter(0);
    }
  };



  const handleElevenLabsClick = async () => {
    // Pause audio if playing
    if (isPlaying && audioElement) {
      audioElement.pause();
      setIsPlaying(false);
      setLastPlayedTime(audioElement.currentTime);
    }
  
    try {
      // Request mic permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Optional: Add any additional logic after mic permission
      console.log("Mic access granted");
    } catch (error) {
      console.error('Microphone access denied:', error);
      alert('Microphone access is required to use this feature');
    }
  };

  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
        audioElement.load();
      }
    };
  }, [audioElement]);
  
  const getChapterFilterLists = () => {
    let caTtoken = 'category 1';
    const personaCategories = {
      'category 1': { listA: [], listB: [] },
      'category 2': { listA: [], listB: [] },
      'category 3': { listA: [], listB: [] },
      'category 4': { listA: [], listB: [] }
    };
  
    // Find the first category that matches the persona
    const matchedCategory = Object.keys(personaCategories).find(cat => 
     caTtoken.includes(cat.toLowerCase())
    );
  

  
    // If a matching category is found, return its lists
    if (matchedCategory) {
      return personaCategories[matchedCategory];
    }
  
    // If no match is found, return default lists (category 1)
    return personaCategories['category 1'];
  };

  
  useEffect(() => {
    if (audioElement) {
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };

      const handleTimeUpdate = () => {
        const currentTimeInSeconds = audioElement.currentTime;
        setCurrentTime(currentTimeInSeconds);
        
        const lastSubmitMinutes = Math.floor(lastSubmitTime / 300);
        const currentMinutes = Math.floor(currentTimeInSeconds / 300);
        
        if (currentMinutes > lastSubmitMinutes) {
          submitToAirtabletime(currentMinutes);
          setLastSubmitTime(currentTimeInSeconds);
        }
      };

      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      if (audioElement.duration) {
        setDuration(audioElement.duration);
      }

      return () => {
        audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioElement, lastSubmitTime]);




  
  const playChapter = async (index) => {
    // If the requested chapter is the current chapter and it's already loaded
    if (currentChapter === index && audioElement) {
      // If the audio is paused, start playing
      if (audioElement.paused) {
        try {
          await audioElement.play();
          setIsPlaying(true);
          return;
        } catch (error) {
          console.error("Failed to play current chapter:", error);
          setError(`Failed to play chapter. Error: ${error.message}`);
          return;
        }
      }
      
      // If it's already playing, do nothing
      return;
    }
  
    // Existing loading prevention
    if (isChapterLoading) return;
    
    setIsChapterLoading(true);
    
    try {
      // Non-blocking event logging
      const email = localStorage.getItem('plutoytemail') || 'anonymous';
      submitToAirtableB(index);
  
      // Stop current audio immediately
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
  
      // Preload next and previous chapters in background
      const preloadChapters = [
        chapters[index - 1]?.url, 
        chapters[index]?.url, 
        chapters[index + 1]?.url
      ].filter(Boolean);
  
      // Create new audio with optimized loading
      const newAudio = new Audio(chapters[index].url);
      
      // Simplify audio loading
      await new Promise((resolve, reject) => {
        newAudio.oncanplaythrough = resolve;
        newAudio.onerror = reject;
        newAudio.load();
      });
  
      // Update state
      setCurrentChapter(index);
      setCurrentTime(0);
      setAudioElement(newAudio);
  
      // Start playing
      await newAudio.play();
      setIsPlaying(true);
  
    } catch (error) {
      console.error("Chapter play failed:", error);
      setError(`Chapter load error: ${error.message}`);
    } finally {
      setIsChapterLoading(false);
    }
  };




  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      playChapter(currentChapter + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      playChapter(currentChapter - 1);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };



  const handleSupportClick = async (e) => {
    e.preventDefault();
  
    // Define your PWA details
    const PWA_ID = 'com.pluto.audiobooks';
    const PWA_URL = 'https://pluto-stories.vercel.app';
  
    try {
      // Check if the PWA is installed
      if ('getInstalledRelatedApps' in navigator) {
        const relatedApps = await navigator.getInstalledRelatedApps();
        const plutoPWA = relatedApps.find(app => 
          app.id === PWA_ID || 
          app.url.startsWith(PWA_URL)
        );
  
        if (plutoPWA) {
          // PWA is installed, try to launch it
          console.log('Found installed Pluto PWA');
          
          // For modern browsers that support launching PWAs
          if ('launchQueue' in window) {
            window.launchQueue.setConsumer(launchParams => {
              if (launchParams.targetURL) {
                window.location.href = '/login';
              }
            });
          } else {
            // Fallback to basic URL handling
            window.location.href = '/login';
          }
          return;
        }
      }
      
      // If PWA is not installed or can't be detected, fall back to web URL
      window.location.href = `${PWA_URL}/login`;
      
    } catch (error) {
      console.error('Error launching PWA:', error);
      // Fallback to web URL
      window.location.href = `${PWA_URL}/login`;
    }
  };
  




  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
      setLastPlayedTime(audioElement.currentTime);
    }

    setIsProcessing(true);

    try {
      let route;
      if (bookName == "YoutubeGrowth") route = "askquestion";
      else route = "askquestion1";
      const response = await fetch(`"https://contractus.co.in/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, persona, Name, bookName }),
      });

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      const data = await response.json();
      setAnswer(data.answer);
      setAnswerAudioSrc(data.audioUrl);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error asking question:", error);
      setAnswer("Failed to get an answer. Please try again.");
      setError(`Failed to get answer. Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuestion("");
    setAnswer("");
    setError("");
  };

  const rippleElements = [
    { duration: "1s", delay: "0.1s" },
    { duration: "1s", delay: "0.2s" },
    { duration: "1s", delay: "0.3s" },
  ];

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-[#060f1c] min-h-[100dvh]">
     
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="w-full h-[100dvh] sm:h-[900px] sm:max-h-[90vh] sm:max-w-[375px] bg-[#0a192f] rounded-[40px] shadow-xl overflow-hidden flex flex-col relative">
          {/* Author Image - Positioned above book image */}

          <button 
            onClick={() => navigate('/onboarding')}
            className="absolute top-4 left-4 z-20 w-8 h-8 bg-[#1d3557] rounded-full flex items-center justify-center text-white hover:bg-[#2a4a7f] transition-colors duration-200"
          >
            <Home size={16} className="text-[#64ffda]" />
          </button>


          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 ${
              !isModalOpen ? "z-10" : ""
            }`}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              {isAnswerPlaying &&
                rippleElements.map((ripple, index) => (
                  <div
                    key={index}
                    className="absolute rounded-full border border-[#64ffda]"
                    style={{
                      animation: `ripple ${ripple.duration} ease-out ${ripple.delay} infinite`,
                      width: "120%",
                      height: "120%",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: 0.7,
                    }}
                  />
                ))}
            </div>
          </div>

          {/* Book Image Section - Adjusted height */}
          <div className="relative w-full pt-[35vh]">
            <div className="absolute inset-0">
              <img 
                src="/images/star.webp" 
                alt="Space Background" 
                className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-300 ${
                  isAnswerPlaying ? "filter blur-sm" : ""
                }`}
              />
 
            </div>
          </div>

          {/* Controls Section */}
          <div className="px-2 mt-4">
        
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Sleep Stories</h2>
              <div 
                onClick={handleSupportClick}
                className="cursor-pointer px-2 py-1 rounded-full flex items-center justify-center bg-[#1d3557]"
              >
                <span className="text-[10px] text-white">Support</span>
              </div>
            </div>
            <p className="text-sm text-gray-300">calm by pluto</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700 mt-4">
            <button
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === 'controls'
                  ? 'text-[#64ffda] border-b-2 border-[#64ffda]'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('controls')}
            >
              Pluto
            </button>
       
          </div>

          {/* Tab Content */}
          {activeTab === 'controls' && (
            <div className="p-4 h-[75vh] overflow-y-auto">
              <div className="text-left mb-4 mt-[2vh]">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Chapter: 
                  <span className="text-white font-semibold ml-2">
                    {chapters[currentChapter]?.title || `Chapter ${currentChapter + 1}`}
                  </span>
                </p>
              </div>
            
              {isChapterLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4 mt-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#64ffda] border-t-transparent"/>
                  <p className="text-xs text-gray-400">Loading chapter, no compromise with audio quality...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center mt-[3vh]">
                    <span className="text-xs text-gray-400 w-12 text-right">
                      {formatTime(currentTime)}
                    </span>
                    
                    <div
  ref={progressBarRef}
  className="flex-grow mx-2 h-3 bg-gray-700 rounded-full cursor-pointer relative"
  onMouseDown={handleProgressBarInteraction}
  onTouchStart={handleProgressBarInteraction}
>
  {/* Buffered progress */}
  <div
    className="absolute top-0 left-0 h-3 bg-gray-600 rounded-full"
    style={{ width: `${loadedProgress}%` }}
  />
  
  {/* Playback progress */}
  <div
    className="absolute top-0 left-0 h-3 bg-[#64ffda] rounded-full"
    style={{ width: `${(currentTime / duration) * 100}%` }}
  />
  
  {/* Seek handle */}
  <div
    className="absolute w-4 h-4 bg-[#64ffda] rounded-full shadow-md transform -translate-y-1/2"
    style={{
      top: '50%',
      left: `${(currentTime / duration) * 100}%`,
      transform: 'translate(-50%, -50%)',
    }}
  />
</div>
                    
                    <span className="text-xs text-gray-400 w-12 text-left">
                      {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex justify-center items-center space-x-16 mb-1 mt-4">
                    <div className="flex flex-col items-center">
                      <SkipBack 
                        size={16}
                        className={`${currentChapter === 0 ? 'text-gray-600' : 'text-gray-300 hover:text-white cursor-pointer'} mb-2`}
                        onClick={currentChapter === 0 ? null : handlePreviousChapter}
                      />
                      <span className="text-[9px] text-gray-400">Previous</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <button 
                        onClick={togglePlayPause}
                        disabled={isChapterLoading}
                        className={`w-12 h-12 bg-[#1d3557] rounded-full flex items-center justify-center text-white shadow-md transition-shadow mb-2 border-2 border-[#64ffda] ${
                          !isChapterLoading ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {isPlaying ? (
                          <Pause size={18} fill="white"/>
                        ) : (
                          <Play size={18} fill="white"/>
                        )}
                      </button>
                      <span className="text-[11px] text-gray-400">Play</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <SkipForward
                        size={16}
                        className={`${currentChapter >= chapters.length - 1 ? 'text-gray-600' : 'text-gray-300 hover:text-white cursor-pointer'} mb-2`}
                        onClick={currentChapter >= chapters.length - 1 ? null : handleNextChapter}
                      />
                      <span className="text-[9px] text-gray-400">Next</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="p-4 h-[65vh] overflow-y-auto custom-scrollbar">


{isBuffering && (
  <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-1 bg-gray-800">
    <div className="h-1 bg-[#64ffda] animate-progress" style={{ width: `${loadedProgress}%` }} />
  </div>
)}

              {(() => {
                const { listA, listB } = getChapterFilterLists(persona);
        
                return chapters
                  .map((chapter, originalIndex) => ({ chapter, originalIndex }))
                  .filter(({ originalIndex }) => !listA.includes(originalIndex))
                  .map(({ chapter, originalIndex }, filteredIndex) => {
                    const chapterToPlay = listB.includes(filteredIndex + 1) 
                      ? originalIndex - 1 
                      : originalIndex;
        
                    return (
                      <div
                      key={originalIndex}
                      onClick={() => !isChapterLoading && playChapter(chapterToPlay)}
                      className={`py-2 sm:py-2.5 border-b border-gray-700 first:border-t ${
                        currentChapter === originalIndex ? "bg-[#1d2536]" : ""
                      } cursor-pointer transition-colors ${isChapterLoading ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <div className="px-2 flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">
                            Chapter {filteredIndex + 1}
                          </p>
                          <p className={`text-sm text-white ${
                            currentChapter === originalIndex ? "font-bold" : ""
                          }`}>
                            {chapter.title || `Chapter ${filteredIndex + 1}`}
                          </p>
                        </div>
                        {isChapterLoading && currentChapter === originalIndex && (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#64ffda] border-t-transparent"/>
                        )}
                      </div>
                    </div>
                      );
                    })
                })()}
              </div>
            )}
      
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(100,255,218,0.2);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(100,255,218,0.3);
              }
      
              @keyframes ripple {
                0% {
                  transform: translate(-50%, -50%) scale(0);
                  opacity: 0.7;
                }
                100% {
                  transform: translate(-50%, -50%) scale(2);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )}
      </div>
      );
    };
    export default Player;