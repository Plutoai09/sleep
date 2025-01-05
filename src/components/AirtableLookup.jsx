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
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (!recordId) {
      setError('No ID provided in URL parameters');
      return;
    }

    const fetchRecord = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?filterByFormula={ID}="${recordId}"`,
          {
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Airtable');
        }

        const data = await response.json();
        
        if (data.records && data.records.length > 0) {
          setOutput(data.records[0].fields.output);
          setName(data.records[0].fields.name || 'Anonymous');
        } else {
          setError('No record found with the specified ID');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const containerStyle = {
    height: '95vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '0 20px',
    overflow: 'hidden'
  };

  const cardStyle = {
    padding: '24px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const contentWrapperStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 0
  };

  const shayariStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(1rem, 4vh, 1.5rem)',
    lineHeight: '1.4',
    color: '#2d3748',
    textAlign: 'center',
    margin: '0 0 12px 0',
    fontStyle: 'italic',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const authorStyle = {
    textAlign: 'right',
    color: '#718096',
    fontSize: 'clamp(0.875rem, 2vh, 1rem)',
    marginTop: '8px',
    fontFamily: 'Arial, sans-serif'
  };

  const buttonStyle = {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: 'clamp(0.875rem, 2vh, 1rem)',
    cursor: buttonLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    marginTop: '16px',
    fontWeight: '500',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    opacity: buttonLoading ? 0.8 : 1,
    alignSelf: 'center'
  };

  const spinnerStyle = {
    width: '20px',
    height: '20px',
    border: '3px solid transparent',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '10px',
    display: buttonLoading ? 'block' : 'none'
  };

  const messageStyle = {
    textAlign: 'center',
    color: '#666',
    padding: '12px',
    fontSize: 'clamp(0.875rem, 2vh, 1rem)'
  };

  const errorStyle = {
    color: '#dc2626',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#fee2e2',
    borderRadius: '8px',
    margin: '12px 0',
    fontSize: 'clamp(0.875rem, 2vh, 1rem)'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={cardStyle}>
        {!recordId && (
          <div style={messageStyle}>
            Please provide an ID in the URL parameters (e.g., ?id=1225544)
          </div>
        )}

        {loading && (
          <div style={messageStyle}>Loading your shayari...</div>
        )}
        
        {error && (
          <div style={errorStyle}>Error: {error}</div>
        )}
        
        {output && (
          <div style={contentWrapperStyle}>
            <div style={shayariStyle}>{output}</div>
            <div style={authorStyle}>- {name}</div>
          </div>
        )}

        <button 
          style={buttonStyle}
          onClick={airtableUpdate}
          onMouseOver={(e) => !buttonLoading && (e.target.style.backgroundColor = '#4338ca')}
          onMouseOut={(e) => !buttonLoading && (e.target.style.backgroundColor = '#4f46e5')}
          disabled={buttonLoading}
        >
          <div style={spinnerStyle}></div>
          {buttonLoading ? 'Creating...' : 'Create your own shayari in 2 mins'}
        </button>
      </div>
    </div>
  );
};

export default AirtableLookup;