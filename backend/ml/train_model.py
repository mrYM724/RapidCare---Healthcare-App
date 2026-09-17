import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

def create_synthetic_data():
    # Symptoms mapping: 
    # 0: None, 1: Mild pain, 2: Bleeding, 3: Unconscious, 4: Chest pain, 5: Breathing difficulty
    
    data = {
        'age': [25, 65, 45, 12, 80, 55, 30, 70, 22, 60],
        'symptom_1': [1, 4, 2, 1, 5, 4, 1, 3, 0, 5],
        'symptom_2': [0, 5, 1, 0, 3, 0, 0, 5, 0, 4],
        'heart_rate': [75, 120, 90, 80, 140, 110, 70, 40, 65, 130],
        'blood_pressure_sys': [120, 160, 110, 100, 180, 150, 115, 90, 110, 170],
        'severity': ['Low', 'Critical', 'Medium', 'Low', 'Critical', 'High', 'Low', 'Critical', 'Low', 'Critical']
    }
    
    # Expand to 1000 rows with some noise
    df = pd.DataFrame(data)
    df_expanded = pd.concat([df]*100, ignore_index=True)
    
    return df_expanded

def train():
    print("Generating synthetic data...")
    df = create_synthetic_data()
    
    X = df.drop('severity', axis=1)
    y = df['severity']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    accuracy = model.score(X_test, y_test)
    print(f"Model accuracy: {accuracy * 100:.2f}%")
    
    model_path = os.path.join(os.path.dirname(__file__), 'triage_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train()
