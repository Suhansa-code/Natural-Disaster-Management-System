import React, { useState } from "react";
import axios from "axios";

const FloodPredictor = () => {
    const [inputs, setInputs] = useState({
        MonsoonIntensity: "",
        Urbanization: "",
        DrainageSystems: ""
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/predict", {
                MonsoonIntensity: inputs.MonsoonIntensity,
                Urbanization: inputs.Urbanization,
                DrainageSystems: inputs.DrainageSystems,
            });
            setResult(response.data.floodProbability);
        } catch (error) {
            console.error("Error:", error);
            setResult("Error occurred. See console.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Flood Probability Predictor</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <div className="mb-4">
                    <input
                        type="number"
                        name="MonsoonIntensity"
                        placeholder="Monsoon Intensity (0-10)"
                        value={inputs.MonsoonIntensity}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        name="Urbanization"
                        placeholder="Urbanization Level (0-10)"
                        value={inputs.Urbanization}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        name="DrainageSystems"
                        placeholder="Drainage Effectiveness (0-10)"
                        value={inputs.DrainageSystems}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Predict
                </button>
            </form>

            {result !== null && (
                <h3 className="text-xl font-semibold text-gray-800">
                    Flood Probability: {result}%
                </h3>
            )}
        </div>
    );
};

export default FloodPredictor;
