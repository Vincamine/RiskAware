# RiskAware
 
## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm/yarn

### Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/RiskAware-Hackathon.git
cd RiskAware-Hackathon
```

### Testing the Demo

To quickly test the file upload and risk analysis feature, follow these steps:

1. **Start the Backend Server**
   ```bash
   cd backend
   
   # Install dependencies
   pip install fastapi uvicorn python-multipart numpy
   
   # Start the server
   uvicorn main:app --reload
   ```

2. **In a separate terminal, start the Frontend Server**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start the frontend
   npm start
   ```

3. **Test the Application**
   - Open your browser to http://localhost:3000
   - Upload any PDF or DOCX file using the upload area
   - Click "Analyze Contract" 
   - View the risk analysis results with risk levels marked for different sections

### Full Setup (with AI Models)

For a complete setup with AI models:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# OR
venv\Scripts\activate  # On Windows

pip install fastapi uvicorn python-multipart numpy torch onnxruntime transformers

# Download the models
python download_model.py

# Start the FastAPI server
uvicorn main:app --reload
```

## Download Model
Since the model is too large to store in GitHub, you need to download it separately.

Run the following command:
```bash
python backend/download_model.py
```

This will download the model from Google Drive and place it in backend/models/.

---


## Project Structure

```
RiskAware-Hackathon/
├── backend/
│   ├── main.py            # FastAPI entry point
│   ├── models/            # AI models directory (downloaded separately)
│   ├── utils/             # Utility functions
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main application
│   │   └── index.js       # Entry point
│   └── package.json       # JS dependencies
└── README.md              # This file
```

## API Endpoints

Current implemented endpoints:

- `GET /` - Health check
- `POST /api/upload` - Upload contract documents (PDF/DOCX) and get risk analysis
- `POST /analyze/` - Process text with AI models
- `POST /transcribe/` - Process voice input with Whisper

Planned endpoints:
- `GET /api/risk-assessment` - Generate risk scores and heatmaps
- `GET /api/export` - Generate downloadable reports

## Features

### Document Risk Analysis
Upload PDF or DOCX contract files to get AI-powered risk analysis:
- Overall risk score and risk level
- Section-by-section risk assessment with visual heatmap
- Identification of high-risk clauses
- Key concerns and recommendations



## Frontend Page
![Frontend Homepage](/util/Homepage.png.png)

## License

[MIT License](LICENSE)