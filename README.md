# 🚑 RapidCare — AI-Powered Emergency Healthcare Response Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.141-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Scikit Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white)

**A real-time emergency healthcare platform connecting patients, hospitals, and ambulances through AI-assisted triage, live maps, and intelligent dispatch workflows.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Machine Learning Model](#-machine-learning-model)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)

---

## 🔍 Overview

RapidCare is a full-stack emergency healthcare response platform that streamlines the critical workflow between patients reporting emergencies, hospitals receiving and triaging cases, and ambulance dispatch. The platform leverages a **machine learning model** to predict emergency severity in real-time, helping medical teams prioritize the most critical cases first.

---

## ✨ Features

### 🏥 Patient Dashboard
- **Emergency Reporting** — Submit vitals (age, heart rate, blood pressure) and symptoms through an intuitive form
- **AI-Powered Triage** — Instantly receive an ML-predicted severity level (Critical / High / Medium / Low)
- **Hospital Discovery** — View nearby hospitals with real-time bed availability
- **Live Map** — Interactive OpenStreetMap showing your location and nearby medical facilities

### 🏨 Hospital Dashboard
- **Real-Time Stats** — Monitor available beds, pending emergencies, and dispatched ambulances at a glance
- **Incoming Emergency Feed** — Prioritized list of patient emergencies with severity badges, symptoms, and distance
- **Accept & Dispatch** — One-click patient acceptance with ambulance dispatch confirmation
- **Live Map** — Track all active emergencies on an interactive map

### 🤖 AI Triage Engine
- **Random Forest Classifier** trained on emergency medical data
- Predicts severity based on: age, primary/secondary symptoms, heart rate, and blood pressure
- Returns one of four severity levels: `Critical`, `High`, `Medium`, `Low`

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Leaflet |
| **Backend** | Python 3.13, FastAPI, Uvicorn |
| **Machine Learning** | Scikit-learn (Random Forest), Pandas, Joblib |
| **Database** | Supabase (PostgreSQL + Auth + Row Level Security) |
| **Maps** | Leaflet + OpenStreetMap |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
RapidCare/
├── backend/
│   ├── api/
│   │   └── routes.py              # FastAPI endpoints (triage, hospital discovery)
│   ├── ml/
│   │   ├── train_model.py         # ML model training script
│   │   └── triage_model.pkl       # Trained Random Forest model (generated)
│   ├── main.py                    # FastAPI app entry point
│   └── requirements.txt           # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── LiveMap.jsx        # React Leaflet map component
│   │   ├── pages/
│   │   │   ├── PatientDashboard.jsx
│   │   │   └── HospitalDashboard.jsx
│   │   ├── lib/
│   │   │   └── supabase.js        # Supabase client config
│   │   ├── App.jsx                # Main app with tab navigation
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Tailwind CSS v4 styles
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── supabase_schema.sql            # Database schema for Supabase
├── setup.ps1                      # Automated setup script (Windows)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/mrYM724/RapidCare---Healthcare-App.git
cd RapidCare---Healthcare-App
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Train the ML Model

```bash
python ml/train_model.py
```

You should see:
```
Generating synthetic data...
Training Random Forest model...
Model accuracy: 100.00%
Model saved to .../triage_model.pkl
```

### 4. Start the Backend Server

```bash
uvicorn main:app --reload --port 8000
```

API will be available at `http://localhost:8000` and Swagger docs at `http://localhost:8000/docs`.

### 5. Frontend Setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

App will be available at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/predict-severity` | AI triage — predict emergency severity |
| `GET` | `/api/discover-hospitals` | Find nearby hospitals |

### POST `/api/predict-severity`

**Request Body:**
```json
{
  "age": 65,
  "symptom_1": 4,
  "symptom_2": 5,
  "heart_rate": 120,
  "blood_pressure_sys": 160
}
```

**Symptom Codes:**
| Code | Symptom |
|------|---------|
| 0 | None |
| 1 | Mild pain |
| 2 | Bleeding |
| 3 | Unconscious |
| 4 | Chest pain |
| 5 | Breathing difficulty |

**Response:**
```json
{
  "severity": "Critical"
}
```

---

## 🧠 Machine Learning Model

- **Algorithm:** Random Forest Classifier (100 estimators)
- **Features:** Age, Primary Symptom, Secondary Symptom, Heart Rate, Systolic Blood Pressure
- **Target Classes:** `Low`, `Medium`, `High`, `Critical`
- **Training Data:** Synthetic dataset of 1,000 emergency scenarios
- **Library:** Scikit-learn

The model is trained via `backend/ml/train_model.py` and serialized as `triage_model.pkl` using Joblib.

---

## 🗄 Database Schema

The Supabase schema (`supabase_schema.sql`) includes four tables:

- **`profiles`** — User profiles with role-based access (patient / hospital / ambulance)
- **`hospitals`** — Hospital details with geolocation and bed availability
- **`ambulances`** — Ambulance tracking with status and current assignment
- **`emergencies`** — Emergency records linking patients, hospitals, and ambulances with AI severity predictions

---

## 📸 Screenshots

> Run the app locally to see the full UI with glassmorphic panels, gradient severity cards, interactive maps, and real-time emergency workflows.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for emergency healthcare response**

</div>
