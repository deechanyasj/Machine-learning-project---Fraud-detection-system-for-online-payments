# Fraud Detection System

A machine learning-based fraud detection system for online payments using HTML, CSS, JavaScript frontend and Python Flask backend.

## Features

- Real-time fraud detection using Logistic Regression
- Analysis of transaction patterns and risk factors
- Geo-location mismatch detection
- Merchant risk assessment
- Responsive web interface

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python app.py
```

3. Open your browser and go to `http://localhost:5000`

## Usage

1. Enter transaction details in the form
2. Click "Check for Fraud" to analyze the transaction
3. View the fraud probability and risk factors
4. Get recommendations for transaction handling

## Risk Factors Analyzed

- Transaction amount
- Merchant risk score (1-10)
- Location match verification
- Transaction timing patterns

The system provides real-time analysis and helps prevent financial losses through intelligent fraud detection.