import axios from "axios";
import { useState } from "react";

function FloodPredictor() {
  const [inputs, setInputs] = useState({
    MonsoonIntensity: "",
    Urbanization: "",
    DrainageSystems: ""
  });

  const [result, setResult] = useState(null);
  const [graphUrl, setGraphUrl] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/predict", inputs); // Ensure port matches Flask backend
      setResult(res.data.floodProbability);
      setGraphUrl(res.data.graphUrl);
    } catch (err) {
      alert("Prediction failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Flood Prediction System
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Welcome to the Flood Predictor! Enter the following information to predict the flood probability in your area.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="MonsoonIntensity" className="block text-gray-700 font-medium">
              Monsoon Intensity (1-10)
            </label>
            <input
              type="number"
              name="MonsoonIntensity"
              placeholder="Monsoon Intensity"
              onChange={handleChange}
              value={inputs.MonsoonIntensity}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="1"
              max="10"
              required
            />
          </div>
          <div>
            <label htmlFor="Urbanization" className="block text-gray-700 font-medium">
              Urbanization Level (1-10)
            </label>
            <input
              type="number"
              name="Urbanization"
              placeholder="Urbanization Level"
              onChange={handleChange}
              value={inputs.Urbanization}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="1"
              max="10"
              required
            />
          </div>
          <div>
            <label htmlFor="DrainageSystems" className="block text-gray-700 font-medium">
              Drainage Effectiveness (1-10)
            </label>
            <input
              type="number"
              name="DrainageSystems"
              placeholder="Drainage Effectiveness"
              onChange={handleChange}
              value={inputs.DrainageSystems}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="1"
              max="10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Predict Flood
          </button>
        </form>

        {result !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-indigo-600">
              Predicted Flood Probability: {result}%
            </h2>
          </div>
        )}

        {graphUrl && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-gray-700">Flood Probability Graph:</h3>
            <img
              src={graphUrl}
              alt="Flood Probability Graph"
              className="mx-auto mt-4 rounded-lg max-w-full h-auto" // Ensuring responsive scaling
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FloodPredictor;
