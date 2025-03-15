import React from 'react';

const RiskHeatmap = ({ contractData }) => {
  // 示例数据结构
  const defaultData = {
    sections: [
      "Introduction",
      "Definitions",
      "Services",
      "Payment",
      "Term",
      "Confidentiality",
      "IP Rights",
      "Limitation of Liability",
      "Termination",
      "Notices"
    ],
    riskScores: [
      20, // Low risk
      15, // Low risk
      35, // Low-Medium risk
      65, // Medium risk
      40, // Low-Medium risk
      45, // Medium risk
      75, // Medium-High risk
      90, // High risk
      85, // High risk
      30  // Low-Medium risk
    ]
  };

  // 使用提供的数据或默认回退到示例数据
  const data = contractData || defaultData;

  // 确定风险级别的函数
  const getRiskLevel = (score) => {
    if (score < 30) return { level: 'low', color: '#2ecc71' };
    if (score < 60) return { level: 'medium', color: '#f39c12' };
    return { level: 'high', color: '#e74c3c' };
  };

  return (
    <div className="risk-chart-container">
      <h3>Contract Risk Analysis by Section</h3>
      <div className="simple-heatmap">
        {data.sections.map((section, index) => {
          const score = data.riskScores[index];
          const risk = getRiskLevel(score);
          
          return (
            <div key={index} className="heatmap-row">
              <div className="section-name" style={{ width: '150px', textAlign: 'left', fontWeight: 'medium' }}>
                {section}
              </div>
              <div className="risk-bar-container" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  className="risk-bar" 
                  style={{ 
                    width: `${score}%`, 
                    backgroundColor: risk.color,
                    height: '20px',
                    borderRadius: '4px'
                  }}
                ></div>
                <span className="risk-score" style={{ minWidth: '40px', fontWeight: 'bold' }}>{score}%</span>
              </div>
              <div 
                className={`risk-level risk-${risk.level}`}
                style={{ 
                  width: '80px', 
                  textAlign: 'center',
                  backgroundColor: risk.color,
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}
              >
                {risk.level.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="legend" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', gap: '20px' }}>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="legend-color" style={{ backgroundColor: '#2ecc71', width: '15px', height: '15px', borderRadius: '3px' }}></span>
          <span>Low Risk (0-30%)</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="legend-color" style={{ backgroundColor: '#f39c12', width: '15px', height: '15px', borderRadius: '3px' }}></span>
          <span>Medium Risk (30-60%)</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="legend-color" style={{ backgroundColor: '#e74c3c', width: '15px', height: '15px', borderRadius: '3px' }}></span>
          <span>High Risk (60-100%)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskHeatmap;