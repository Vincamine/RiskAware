# RiskAware
 
## 🔧 Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm/yarn

### Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/RiskAware-Hackathon.git
cd RiskAware-Hackathon
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# OR
venv\Scripts\activate  # On Windows

pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📦 Download Model
Since the model is too large to store in GitHub, you need to download it separately.

Run the following command:
```bash
python backend/download_model.py
```

This will download the model from Google Drive and place it in backend/models/.

---


## 🏗️ Project Structure

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

## 🔄 API Endpoints

Current and planned endpoints:

- `GET /` - Health check
- `POST /api/upload` - Upload contract documents (PDF/DOCX)
- `POST /api/analyze` - Process documents with AI models
- `GET /api/risk-assessment` - Generate risk scores and heatmaps
- `POST /api/voice` - Process voice input for contract review
- `GET /api/export` - Generate downloadable reports

## 📝 License

[MIT License](LICENSE)