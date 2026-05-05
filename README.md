# 🌾 Smart Farming Assistant

AI-powered crop disease detection web app built with React + Flask + TensorFlow.

## Requirements
- Python 3.10+
- Node.js 18+
- Anaconda

## Setup

### 1. Download the model
Download `best_model.keras` from [Google Drive link here] : https://drive.google.com/file/d/1Esm_YI7va3KhmnU4lW863Gn1DGjyRS4I/view?usp=drive_link

### 2. Backend
```bash
conda create -n smartfarm python=3.10 -y
conda activate smartfarm
pip install flask flask-cors tensorflow pillow numpy
python backend/app.py
```

### 3. Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```

### 4. Open browser
Go to http://localhost:3000
