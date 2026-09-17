import os
import joblib
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd

router = APIRouter()

# Load the trained model
try:
    model_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'triage_model.pkl')
    model = joblib.load(model_path)
except Exception as e:
    model = None
    print(f"Warning: Could not load ML model: {e}")

class TriageRequest(BaseModel):
    age: int
    symptom_1: int
    symptom_2: int
    heart_rate: int
    blood_pressure_sys: int

class TriageResponse(BaseModel):
    severity: str

@router.post("/predict-severity", response_model=TriageResponse)
async def predict_severity(req: TriageRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="ML model is not available")
    
    # Create DataFrame for prediction
    data = pd.DataFrame([{
        'age': req.age,
        'symptom_1': req.symptom_1,
        'symptom_2': req.symptom_2,
        'heart_rate': req.heart_rate,
        'blood_pressure_sys': req.blood_pressure_sys
    }])
    
    prediction = model.predict(data)[0]
    return TriageResponse(severity=prediction)

@router.get("/discover-hospitals")
async def discover_hospitals(lat: float, lng: float, radius_km: float = 10.0):
    # In a real app, we would query Supabase for hospitals within `radius_km`
    # using PostGIS or Haversine formula.
    # For now, returning mock data
    return {
        "hospitals": [
            {
                "id": "mock-hospital-1",
                "name": "City General Hospital",
                "distance_km": 2.5,
                "available_beds": 15
            },
            {
                "id": "mock-hospital-2",
                "name": "RapidCare Emergency Center",
                "distance_km": 5.1,
                "available_beds": 3
            }
        ]
    }
