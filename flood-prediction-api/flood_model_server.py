from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS  # To allow requests from your React frontend

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load("flood_model.pkl")
selected_features = ["MonsoonIntensity", "Urbanization", "DrainageSystems"]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        input_data = pd.DataFrame([{
            "MonsoonIntensity": float(data["MonsoonIntensity"]),
            "Urbanization": float(data["Urbanization"]),
            "DrainageSystems": float(data["DrainageSystems"])
        }])
        prediction = model.predict(input_data)[0] * 100
        return jsonify({"floodProbability": round(prediction, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5001)
