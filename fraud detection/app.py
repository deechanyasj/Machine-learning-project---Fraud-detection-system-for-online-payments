from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import datetime
import json

app = Flask(__name__)

class FraudDetector:
    def __init__(self):
        self.model = LogisticRegression()
        self.scaler = StandardScaler()
        self.user_profiles = {}
        self.device_history = {}
        self.is_trained = False
        self._train_model()
    
    def _train_model(self):
        np.random.seed(42)
        n_samples = 1000
        
        # Features: amount, merchant_risk, location_match, transaction_hour, frequency, device_new
        X = np.random.rand(n_samples, 6)
        X[:, 0] = X[:, 0] * 5000  # amount
        X[:, 1] = X[:, 1] * 10    # merchant_risk
        X[:, 2] = np.random.choice([0, 1], n_samples)  # location_match
        X[:, 3] = np.random.randint(0, 24, n_samples)  # transaction_hour
        X[:, 4] = X[:, 4] * 10    # frequency
        X[:, 5] = np.random.choice([0, 1], n_samples)  # device_new
        
        # Generate labels
        y = np.zeros(n_samples)
        for i in range(n_samples):
            risk = 0
            if X[i, 0] > 2000: risk += 0.3
            if X[i, 1] > 7: risk += 0.4
            if X[i, 2] == 0: risk += 0.35
            if X[i, 3] < 6 or X[i, 3] > 22: risk += 0.25
            if X[i, 4] > 7: risk += 0.2
            if X[i, 5] == 1: risk += 0.15
            
            y[i] = 1 if risk > 0.6 else 0
        
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True
    
    def predict(self, data):
        try:
            # Extract features
            user_id = data.get('user_id', 'anonymous')
            device_id = data.get('device_id', 'unknown')
            
            # Update user profile
            if user_id not in self.user_profiles:
                self.user_profiles[user_id] = {
                    'transactions': [],
                    'avg_amount': 0,
                    'last_transaction': None
                }
            
            profile = self.user_profiles[user_id]
            current_time = datetime.datetime.now()
            
            # Calculate frequency (transactions in last hour)
            recent_count = len([t for t in profile['transactions'] 
                              if (current_time - t).total_seconds() < 3600])
            
            # Check if device is new
            device_new = 1 if device_id not in self.device_history else 0
            self.device_history[device_id] = current_time
            
            # Prepare features
            features = [
                data['amount'],
                data['merchant_risk'],
                data['location_match'],
                data['transaction_hour'],
                recent_count,
                device_new
            ]
            
            # Update profile
            profile['transactions'].append(current_time)
            if len(profile['transactions']) > 100:  # Keep only recent 100
                profile['transactions'] = profile['transactions'][-100:]
            
            # Make prediction
            X = np.array([features])
            X_scaled = self.scaler.transform(X)
            
            prediction = self.model.predict(X_scaled)[0]
            probability = self.model.predict_proba(X_scaled)[0][1]
            
            # Determine risk level
            if probability > 0.8:
                risk_level = "HIGH"
                action = "BLOCK"
            elif probability > 0.5:
                risk_level = "MEDIUM"
                action = "VERIFY"
            else:
                risk_level = "LOW"
                action = "ALLOW"
            
            # Get risk factors
            risk_factors = []
            if data['amount'] > 2000:
                risk_factors.append("High transaction amount")
            if data['merchant_risk'] > 7:
                risk_factors.append("High-risk merchant")
            if data['location_match'] == 0:
                risk_factors.append("Geo-location mismatch detected")
            if data['transaction_hour'] < 6 or data['transaction_hour'] > 22:
                risk_factors.append("Unusual transaction time")
            if recent_count > 5:
                risk_factors.append("High transaction frequency")
            if device_new == 1:
                risk_factors.append("New device detected")
            
            # Behavioral analysis
            behavioral_analysis = {
                "spending_pattern": "Abnormal" if data['amount'] > 2000 else "Normal",
                "transaction_frequency": "High" if recent_count > 3 else "Normal",
                "device_trust": "New/Untrusted" if device_new else "Trusted",
                "time_pattern": "Unusual" if (data['transaction_hour'] < 6 or data['transaction_hour'] > 22) else "Normal"
            }
            
            return {
                "is_fraud": bool(prediction),
                "fraud_probability": float(probability),
                "risk_level": risk_level,
                "recommended_action": action,
                "risk_factors": risk_factors,
                "anomaly_score": float(probability * 0.3),
                "behavioral_analysis": behavioral_analysis
            }
            
        except Exception as e:
            return {"error": f"Prediction failed: {str(e)}"}

# Initialize detector
detector = FraudDetector()

@app.route('/')
def index():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return "Error loading page"

@app.route('/style.css')
def style():
    try:
        with open('style.css', 'r', encoding='utf-8') as f:
            return f.read(), 200, {'Content-Type': 'text/css'}
    except:
        return "Error loading styles", 404

@app.route('/script.js')
def script():
    try:
        with open('script.js', 'r', encoding='utf-8') as f:
            return f.read(), 200, {'Content-Type': 'application/javascript'}
    except:
        return "Error loading script", 404

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['amount', 'merchant_risk', 'location_match', 'transaction_hour']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        # Add defaults for optional fields
        data.setdefault('user_id', f"user_{hash(str(data)) % 1000}")
        data.setdefault('device_id', f"device_{hash(str(data)) % 100}")
        
        result = detector.predict(data)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Fraud Detection System...")
    print("Open http://localhost:5000 in your browser")
    app.run(debug=True, host='0.0.0.0', port=5000)