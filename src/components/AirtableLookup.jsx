import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AirtableLookup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(null);

  const AIRTABLE_API_KEY = 'patSi5Eggs9qaa0bs.acd386ca515e763c901c5f411ffa7d1b3d3ae5cc09f91f59f749b76679c43611';
  const AIRTABLE_BASE_ID = 'appgbMrFiY8ifR2uc';
  const AIRTABLE_TABLE_ID = 'Table%201';
  
  const recordId = searchParams.get('id');

  const airtableUpdate = async () => {
    setButtonLoading(true);
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
      
      const randomID = Math.floor(100000 + Math.random() * 900000);
      
      const url = `https://api.airtable.com/v0/appbWeFHuxI7k8sKO/${AIRTABLE_TABLE_ID}`;
  
      const response = await axios.post(url, {
        records: [
          {
            fields: {
              ID: recordId
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
      navigate('/shayari');
      return randomID;
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      navigate('/shayari');
      throw error;
    }
  };

  // ... rest of the existing code ...

  const buttonStyle = {
    backgroundColor: buttonLoading ? '#818cf8' : '#4f46e5',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: buttonLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    marginTop: '30px',
    fontWeight: '500',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    opacity: buttonLoading ? 0.8 : 1
  };

  const spinnerStyle = {
    width: '20px',
    height: '20px',
    border: '3px solid #ffffff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '10px',
    display: buttonLoading ? 'block' : 'none'
  };

  // Add keyframes for spinner animation
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {!recordId && (
          <div style={loadingStyle}>
            Please provide an ID in the URL parameters (e.g., ?id=1225544)
          </div>
        )}

        {loading && (
          <div style={loadingStyle}>Loading your shayari...</div>
        )}
        
        {error && (
          <div style={errorStyle}>Error: {error}</div>
        )}
        
        {output && (
          <>
            <div style={shayariStyle}>{output}</div>
            <div style={authorStyle}>- {name}</div>
          </>
        )}

        <button 
          style={buttonStyle}
          onClick={airtableUpdate}
          disabled={buttonLoading}
          onMouseOver={(e) => !buttonLoading && (e.target.style.backgroundColor = '#4338ca')}
          onMouseOut={(e) => !buttonLoading && (e.target.style.backgroundColor = '#4f46e5')}
        >
          <div style={spinnerStyle}></div>
          {buttonLoading ? 'Creating...' : 'Create your own shayari in 2 mins'}
        </button>
      </div>
    </div>
  );
};

export default AirtableLookup;