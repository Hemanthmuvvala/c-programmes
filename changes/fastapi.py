# main.py - FastAPI Backend
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np
import pickle
import joblib
from datetime import datetime, timedelta
import yfinance as yf

# Import your model modules
# from models.lstm_model import LSTMPredictor
# from models.gru_model import GRUPredictor
# from models.xgboost_model import XGBoostPredictor

app = FastAPI(title="Stock Price Prediction API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define data models
class StockRequest(BaseModel):
    symbols: List[str]
    model_type: Optional[str] = "ensemble"  # Options: "lstm", "gru", "xgboost", "ensemble"

class PredictionResponse(BaseModel):
    predictions: List[Dict[str, Any]]
    timestamp: str

# Load your models
# In practice, you would load your actual trained models
def load_models():
    models = {
        "lstm": None,  # Replace with: joblib.load("models/lstm_model.pkl")
        "gru": None,   # Replace with: joblib.load("models/gru_model.pkl")
        "xgboost": None  # Replace with: joblib.load("models/xgboost_model.pkl")
    }
    return models

models = load_models()

# Get historical data (using yfinance as an example)
def get_stock_data(symbol, days=60):
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        data = yf.download(symbol, start=start_date, end=end_date)
        return data
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return None

# Make predictions using the specified model
def predict_stock_price(symbol, model_type="ensemble"):
    try:
        # Get historical data
        stock_data = get_stock_data(symbol)
        if stock_data is None or stock_data.empty:
            return None
        
        # Process the data for model input
        # This will depend on how your models expect the input data
        # processed_data = process_data_for_model(stock_data)
        
        current_price = stock_data['Close'].iloc[-1]
        
        # Example prediction logic - replace with your actual model prediction code
        if model_type == "lstm" and models["lstm"] is not None:
            # predicted_price = models["lstm"].predict(processed_data)
            predicted_price = current_price * (1 + np.random.uniform(-0.05, 0.05))  # Placeholder
            confidence = np.random.uniform(70, 95)
        elif model_type == "gru" and models["gru"] is not None:
            # predicted_price = models["gru"].predict(processed_data)
            predicted_price = current_price * (1 + np.random.uniform(-0.05, 0.05))  # Placeholder
            confidence = np.random.uniform(65, 90)
        elif model_type == "xgboost" and models["xgboost"] is not None:
            # predicted_price = models["xgboost"].predict(processed_data)
            predicted_price = current_price * (1 + np.random.uniform(-0.05, 0.05))  # Placeholder
            confidence = np.random.uniform(75, 95)
        elif model_type == "ensemble":
            # Combine predictions from all models
            # lstm_pred = models["lstm"].predict(processed_data) if models["lstm"] else current_price * 1.01
            # gru_pred = models["gru"].predict(processed_data) if models["gru"] else current_price * 0.99
            # xgb_pred = models["xgboost"].predict(processed_data) if models["xgboost"] else current_price * 1.02
            
            # Placeholder for ensemble prediction
            predicted_price = current_price * (1 + np.random.uniform(-0.03, 0.03))
            confidence = np.random.uniform(80, 98)
        else:
            return None
            
        change_pct = ((predicted_price - current_price) / current_price) * 100
        
        # Determine recommendation based on predicted change
        if change_pct > 1.5:
            recommendation = "Buy"
        elif change_pct < -1.5:
            recommendation = "Sell"
        else:
            recommendation = "Hold"
            
        return {
            "name": symbol,
            "currentPrice": round(current_price, 2),
            "predictedPrice": round(predicted_price, 2),
            "change": round(change_pct, 2),
            "confidenceLevel": round(confidence, 1),
            "recommendation": recommendation
        }
        
    except Exception as e:
        print(f"Error predicting for {symbol} using {model_type}: {e}")
        return None

@app.get("/")
def read_root():
    return {"message": "Stock Prediction API is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict_stocks(request: StockRequest):
    predictions = []
    
    for symbol in request.symbols:
        prediction = predict_stock_price(symbol, request.model_type)
        if prediction:
            predictions.append(prediction)
    
    if not predictions:
        raise HTTPException(status_code=404, detail="No valid predictions found")
    
    return {
        "predictions": predictions,
        "timestamp": datetime.now().isoformat()
    }

# If you want to include historical data endpoint
@app.get("/historical/{symbol}")
def get_historical_data(symbol: str, days: int = 30):
    data = get_stock_data(symbol, days)
    if data is None or data.empty:
        raise HTTPException(status_code=404, detail=f"No data found for {symbol}")
    
    # Convert to format suitable for frontend charts
    result = []
    for date, row in data.iterrows():
        result.append({
            "date": date.strftime("%Y-%m-%d"),
            "open": round(row["Open"], 2),
            "high": round(row["High"], 2),
            "low": round(row["Low"], 2),
            "close": round(row["Close"], 2),
            "volume": row["Volume"]
        })
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
