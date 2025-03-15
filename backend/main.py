from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import random
import os
import time

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# For demo purposes, we're not loading the models to simplify testing
# In a real implementation, you would use the models for actual analysis

# **Speech-to-Text API**
@app.post("/transcribe/")
async def transcribe(audio_file: UploadFile = File(...)):
    # Mock implementation for demo
    await audio_file.read()  # Read the file but don't process it
    time.sleep(1)  # Simulate processing time
    return {"transcription": "This is a mock transcription for demonstration purposes."}

# **Text Contract Analysis API**
@app.post("/analyze/")
async def analyze(text: str):
    # Mock implementation for demo
    time.sleep(1)  # Simulate processing time
    return {"analysis": [random.random() for _ in range(10)]}

# Root endpoint for health check
@app.get("/")
async def root():
    return {"message": "RiskAware API is running"}

# **Contract Upload API**
@app.post("/api/upload")
async def upload_contract(file: UploadFile = File(...)):
    """
    Upload a contract file (PDF or DOCX) for analysis with risk marking
    """
    await file.read()  # Read the file (not actually used in this demo)
    
    # Generate random risk analysis for demo
    sections = [
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
    ]
    
    # Demo risk scores
    risk_scores = [
        random.randint(10, 30),  # Usually Low risk
        random.randint(10, 30),  # Usually Low risk
        random.randint(20, 50),  # Low-Medium risk
        random.randint(50, 70),  # Medium risk
        random.randint(30, 50),  # Low-Medium risk
        random.randint(30, 60),  # Medium risk
        random.randint(60, 90),  # High risk
        random.randint(70, 100), # High risk
        random.randint(70, 100), # High risk
        random.randint(20, 40)   # Low-Medium risk
    ]
    
    # Count clauses by risk level
    high_risk_count = sum(1 for score in risk_scores if score >= 60)
    medium_risk_count = sum(1 for score in risk_scores if 30 <= score < 60)
    low_risk_count = sum(1 for score in risk_scores if score < 30)
    total_clauses = len(risk_scores)
    
    # Calculate overall risk score (weighted average)
    overall_score = sum(risk_scores) / len(risk_scores)
    
    # Determine overall risk level
    risk_level = "High" if overall_score >= 60 else "Medium" if overall_score >= 30 else "Low"
    
    # Generate key concerns based on highest risk sections
    high_risk_sections = [(sections[i], risk_scores[i]) for i in range(len(sections)) if risk_scores[i] >= 60]
    high_risk_sections.sort(key=lambda x: x[1], reverse=True)
    
    key_concerns = [
        f"{section} section poses significant risk with a score of {score}%" 
        for section, score in high_risk_sections
    ]
    
    if not key_concerns:
        key_concerns = ["No significant risks detected in this contract"]
    
    # Generate recommendations
    recommendations = [
        f"Review {section} section in detail" for section, _ in high_risk_sections
    ]
    
    if not recommendations:
        recommendations = ["Contract appears to have low risk overall"]
    else:
        recommendations.append("Consider legal consultation for high-risk clauses")
    
    # Mock response for demo
    return {
        "fileId": f"contract-{random.randint(1000, 9999)}",
        "documentName": file.filename,
        "documentSize": f"{random.randint(1, 5)}.{random.randint(1, 9)} MB",
        "overallScore": round(overall_score),
        "riskLevel": risk_level,
        "highRiskClauses": high_risk_count,
        "mediumRiskClauses": medium_risk_count,
        "lowRiskClauses": low_risk_count,
        "totalClauses": total_clauses,
        "analyzedPages": random.randint(5, 20),
        "analysisDate": "",  # Frontend will use current date
        "keyConcerns": key_concerns,
        "recommendations": recommendations,
        "sections": sections,
        "riskScores": risk_scores
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)