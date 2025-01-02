import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Initialize deferredPrompt
window.deferredPrompt = null;

// Function to register service worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      console.log('ServiceWorker registration successful:', registration.scope);
      
      // After SW is registered, start listening for beforeinstallprompt
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        window.deferredPrompt = e;
        console.log('beforeinstallprompt event was fired and stored');
      });
      
    } catch (err) {
      console.error('ServiceWorker registration failed:', err);
    }
  }
};

// Initialize the app
const initializeApp = () => {
  // Register service worker first


  // Then render the app
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// Start everything when the page loads
window.addEventListener('load', initializeApp);