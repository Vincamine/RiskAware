import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoiceAssistant = ({ fileId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState([
    "What are the termination clauses?",
    "Can you explain the payment terms?",
    "What are my obligations in this contract?"
  ]);

  const toggleRecording = () => {
    // In a real implementation, this would handle the WebAudio API
    // and speech recognition. For now, it's just a mock.
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // Simulate received voice input after stopping recording
      setTimeout(() => {
        setVoiceQuery("What are the liability limitations in this contract?");
      }, 1000);
    }
  };

  const handleVoiceQuery = async () => {
    if (!voiceQuery.trim()) {
      alert("Please enter a question about the contract");
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate a response
      setTimeout(() => {
        setVoiceResponse(
          "The contract contains a liability limitation clause in Section 9.3 that caps damages at the total amount paid in the previous 12 months. This is considered a high-risk clause as it significantly limits your ability to recover damages in case of service failure or breach. I recommend reviewing this clause carefully and potentially negotiating for a higher cap or exceptions for certain types of damages."
        );
        
        // Add to recent queries if not already there
        if (!recentQueries.includes(voiceQuery)) {
          setRecentQueries(prev => [voiceQuery, ...prev].slice(0, 5));
        }
        
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error processing voice query:", error);
      setIsLoading(false);
      alert("Failed to process your question. Please try again.");
    }
  };

  const selectRecentQuery = (query) => {
    setVoiceQuery(query);
  };

  useEffect(() => {
    // Cleanup recording if component unmounts while recording
    return () => {
      if (isRecording) {
        // In a real implementation, this would stop any recording in progress
      }
    };
  }, [isRecording]);

  return (
    <div className="voice-assistant">
      <div className="voice-input-section">
        <div className="voice-record-container">
          <button 
            className={`record-button ${isRecording ? 'recording' : ''}`}
            onClick={toggleRecording}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            {isRecording ? "Stop Recording" : "Start Voice Recording"}
          </button>
          <p className="voice-status">
            {isRecording ? "Listening..." : "Click to start speaking"}
          </p>
        </div>
        
        <div className="text-input-container">
          <p className="input-label">Or type your question:</p>
          <div className="input-with-button">
            <input
              type="text"
              className="query-input"
              value={voiceQuery}
              onChange={(e) => setVoiceQuery(e.target.value)}
              placeholder="Ask about specific clauses, risks, or terms..."
            />
            <button 
              className="ask-button"
              onClick={handleVoiceQuery}
              disabled={isLoading || !voiceQuery.trim()}
            >
              {isLoading ? "Processing..." : "Ask"}
            </button>
          </div>
        </div>
        
        <div className="recent-queries">
          <h4>Recent Questions</h4>
          <ul>
            {recentQueries.map((query, index) => (
              <li key={index} onClick={() => selectRecentQuery(query)}>
                {query}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {voiceResponse && (
        <div className="voice-response">
          <h3>Answer</h3>
          <div className="response-card">
            <p>{voiceResponse}</p>
          </div>
          <div className="response-actions">
            <button className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save to Report
            </button>
            <button className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Follow-up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;