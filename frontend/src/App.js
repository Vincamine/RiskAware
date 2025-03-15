import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import "./ComponentStyles.css";
import RiskHeatmap from "./RiskHeatmap";
import VoiceAssistant from "./VoiceAssistant";
import ContractSummary from "./ContractSummary";

function App() {
  const [message, setMessage] = useState("Welcome to RiskAware");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch initial message from backend
    axios
      .get("http://localhost:8000/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setMessage("RiskAware - AI-Powered Contract Analysis");
      });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create file preview
      if (selectedFile.type === "application/pdf" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(selectedFile.name);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      
      // Create file preview for dropped file
      if (droppedFile.type === "application/pdf" || droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(droppedFile.name);
        };
        reader.readAsDataURL(droppedFile);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setIsLoading(true);
    
    // In a real implementation, this would upload to the backend
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysisResults({
        fileId: "contract-123",
        documentName: file.name,
        documentSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        overallScore: 75,
        riskLevel: "Medium",
        highRiskClauses: 2,
        mediumRiskClauses: 3,
        lowRiskClauses: 5,
        totalClauses: 10,
        analyzedPages: 12,
        analysisDate: new Date().toLocaleDateString(),
        keyConcerns: [
          "Liability limitations cap damages at 12 months of fees",
          "Early termination carries significant penalties",
          "Intellectual property rights may be compromised"
        ],
        recommendations: [
          "Review Section 9.3 on liability limitations",
          "Clarify termination conditions in Section 8.2",
          "Consider negotiating payment terms in Section 4.1",
          "Seek clarification on intellectual property rights"
        ]
      });
      
      setIsLoading(false);
      setActiveTab("results");
    }, 2000);
  };

  const handleExport = async () => {
    alert("Report export functionality would be implemented here");
    // In a real implementation, this would call the backend to generate a PDF report
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RiskAware</h1>
        <p className="app-subtitle">AI-Powered Contract Risk Analysis</p>
      </header>

      <div className="welcome-message">
        <p>{message}</p>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === "upload" ? "active" : ""} 
          onClick={() => setActiveTab("upload")}
        >
          Upload Contract
        </button>
        <button 
          className={activeTab === "results" ? "active" : ""} 
          onClick={() => setActiveTab("results")}
          disabled={!analysisResults}
        >
          Analysis Results
        </button>
        <button 
          className={activeTab === "voice" ? "active" : ""} 
          onClick={() => setActiveTab("voice")}
          disabled={!analysisResults}
        >
          Voice Assistant
        </button>
      </div>

      <main className="app-content">
        {activeTab === "upload" && (
          <div className="upload-section">
            <h2>Upload Your Contract</h2>
            <p>Upload a PDF or DOCX file to get started with AI-powered risk analysis.</p>
            
            <div 
              className="drop-zone" 
              onDragOver={handleDragOver} 
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx"
                style={{ display: 'none' }}
              />
              <div className="drop-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p>Drag & drop your contract here or click to browse</p>
              <span className="file-types">Supports PDF, DOCX</span>
            </div>

            {filePreview && (
              <div className="file-preview">
                <h3>Selected File</h3>
                <div className="preview-content">
                  <div className="file-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="file-details">
                    <p className="file-name">{filePreview}</p>
                  </div>
                </div>
              </div>
            )}

            <button 
              className="analyze-button"
              onClick={handleUpload}
              disabled={!file || isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Contract"}
            </button>
          </div>
        )}

        {activeTab === "results" && analysisResults && (
          <div className="results-section">
            <div className="results-header">
              <h2>Contract Analysis Results</h2>
              <button className="export-button" onClick={handleExport}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export Report
              </button>
            </div>
            
            <ContractSummary analysisResults={analysisResults} />
            
            <div className="visualization-section">
              <h3>Risk Visualization</h3>
              <RiskHeatmap />
            </div>
            
            <div className="risk-clauses">
              <h3>High-Risk Clauses</h3>
              <div className="clauses-list">
                <div className="clause-item risk-high">
                  <div className="clause-text">Termination Clause (Section 8.2)</div>
                  <div className="clause-content">
                    <p>Either party may terminate this agreement with 30 days written notice. However, termination before the first 6 months requires payment of 50% of the remaining contract value.</p>
                  </div>
                  <div className="clause-meta">
                    <span className="risk-badge risk-high">HIGH RISK</span>
                    <span className="confidence-score">Confidence: 92%</span>
                  </div>
                </div>
                
                <div className="clause-item risk-high">
                  <div className="clause-text">Liability Limitations (Section 9.3)</div>
                  <div className="clause-content">
                    <p>Liability is capped at the total amount paid in the previous 12 months. This includes all forms of damages including direct, indirect, special, incidental, and consequential.</p>
                  </div>
                  <div className="clause-meta">
                    <span className="risk-badge risk-high">HIGH RISK</span>
                    <span className="confidence-score">Confidence: 95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "voice" && analysisResults && (
          <div className="voice-section">
            <h2>Voice Assistant</h2>
            <p>Ask questions about your contract using voice or text.</p>
            
            <VoiceAssistant fileId={analysisResults.fileId} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>RiskAware - AI-Powered Contract Analysis</p>
        <p>Team Dev5ive © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;