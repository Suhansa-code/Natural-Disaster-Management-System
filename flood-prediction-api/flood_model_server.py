from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import os
from flask_cors import CORS

# Initialize Flask app with static folder
app = Flask(__name__, static_folder="static")
CORS(app)

# Load the trained model
model = joblib.load("flood_model.pkl")
selected_features = ["MonsoonIntensity", "Urbanization", "DrainageSystems"]

# Define the graph save path
GRAPH_DIR = os.path.join(app.static_folder, "graphs")
os.makedirs(GRAPH_DIR, exist_ok=True)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        # Parse input data
        input_data = pd.DataFrame([{
            "MonsoonIntensity": float(data["MonsoonIntensity"]),
            "Urbanization": float(data["Urbanization"]),
            "DrainageSystems": float(data["DrainageSystems"])
        }])

        # Make prediction
        prediction = model.predict(input_data)[0] * 100
        predicted_flood_probability = round(prediction, 2)

        # Generate bar chart
        fig, ax = plt.subplots()
        ax.bar(["Flood Probability"], [predicted_flood_probability], color='blue')
        ax.set_ylim(0, 100)
        ax.set_ylabel("Probability (%)")
        ax.set_title(f"Predicted Flood Probability: {predicted_flood_probability}%")

        # Save graph
        graph_filename = "flood_probability_graph.png"
        graph_path = os.path.join(GRAPH_DIR, graph_filename)
        plt.savefig(graph_path)
        plt.close()

        # Return data with full image URL
        return jsonify({
            "floodProbability": predicted_flood_probability,
            "graphUrl": f"http://localhost:5001/static/graphs/{graph_filename}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Explicit route for serving images (optional, but useful in dev)
@app.route("/static/graphs/<filename>")
def serve_graph(filename):
    return send_from_directory(GRAPH_DIR, filename)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
