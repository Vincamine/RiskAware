import React from 'react';

const ContractSummary = ({ analysisResults }) => {
  // Sample data structure if real data is not available
  const defaultData = {
    overallScore: 75,
    riskLevel: "Medium",
    highRiskClauses: 2,
    mediumRiskClauses: 3,
    lowRiskClauses: 5,
    totalClauses: 10,
    analyzedPages: 12,
    documentName: "Service_Agreement_2025.pdf",
    documentSize: "1.2 MB",
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
  };

  // Use provided data or fallback to default
  const data = analysisResults || defaultData;
  
  // Calculate risk distribution for the pie chart
  const riskDistribution = {
    high: data.highRiskClauses,
    medium: data.mediumRiskClauses,
    low: data.lowRiskClauses
  };
  
  // Calculate percentage for risk level
  const getRiskPercentage = (riskLevel) => {
    const total = data.totalClauses;
    const count = riskDistribution[riskLevel.toLowerCase()];
    return Math.round((count / total) * 100);
  };
  
  // Determine the color based on the risk level
  const getRiskColor = (riskLevel) => {
    switch(riskLevel.toLowerCase()) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#2ecc71';
      default:
        return '#3498db';
    }
  };

  return (
    <div className="contract-summary">
      <div className="summary-header">
        <div className="document-info">
          <h3>{data.documentName}</h3>
          <div className="document-meta">
            <span>{data.documentSize}</span>
            <span>•</span>
            <span>{data.analyzedPages} pages</span>
            <span>•</span>
            <span>Analyzed on {data.analysisDate}</span>
          </div>
        </div>
      </div>
      
      <div className="summary-metrics">
        <div className="metric-card">
          <div className="risk-score-container">
            <div 
              className="risk-score" 
              style={{
                backgroundColor: getRiskColor(data.riskLevel),
                color: 'white'
              }}
            >
              {data.overallScore}%
            </div>
            <div className="risk-label">{data.riskLevel} Risk</div>
          </div>
        </div>
        
        <div className="metric-card">
          <h4>Risk Distribution</h4>
          <div className="risk-bars">
            <div className="risk-bar-container">
              <div className="risk-bar-label">High Risk</div>
              <div className="risk-bar-wrapper">
                <div 
                  className="risk-bar" 
                  style={{
                    width: `${getRiskPercentage('high')}%`,
                    backgroundColor: '#e74c3c'
                  }}
                ></div>
              </div>
              <div className="risk-bar-value">{data.highRiskClauses}</div>
            </div>
            
            <div className="risk-bar-container">
              <div className="risk-bar-label">Medium Risk</div>
              <div className="risk-bar-wrapper">
                <div 
                  className="risk-bar" 
                  style={{
                    width: `${getRiskPercentage('medium')}%`,
                    backgroundColor: '#f39c12'
                  }}
                ></div>
              </div>
              <div className="risk-bar-value">{data.mediumRiskClauses}</div>
            </div>
            
            <div className="risk-bar-container">
              <div className="risk-bar-label">Low Risk</div>
              <div className="risk-bar-wrapper">
                <div 
                  className="risk-bar" 
                  style={{
                    width: `${getRiskPercentage('low')}%`,
                    backgroundColor: '#2ecc71'
                  }}
                ></div>
              </div>
              <div className="risk-bar-value">{data.lowRiskClauses}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="summary-insights">
        <div className="insights-card">
          <h4>Key Concerns</h4>
          <ul className="insights-list">
            {data.keyConcerns.map((concern, index) => (
              <li key={index} className="concern-item">
                <span className="bullet">•</span>
                {concern}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="insights-card">
          <h4>Recommendations</h4>
          <ul className="insights-list">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                <span className="bullet">→</span>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractSummary;