import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
import seaborn as sns
import joblib  # <-- Add this line

# Load the dataset
df = pd.read_csv("C:\\Users\\ASUS\\prediction_flood\\flood.csv")

# Selected features based on your dataset
selected_features = ["MonsoonIntensity", "Urbanization", "DrainageSystems"]
X = df[selected_features]
y = df["FloodProbability"]

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "flood_model.pkl")  # ✅ Save the model to a file

# Function to get user input and predict flood probability
def predict_from_user_input():
    print("\nEnter the following details to predict flood probability (0 to 10 scale):")
    monsoon = float(input("🌧️  Monsoon Intensity (0 = none, 10 = extreme): "))
    urbanization = float(input("🏙️  Urbanization Level (0 = rural, 10 = highly urban): "))
    drainage = float(input("🚧  Drainage System Effectiveness (0 = poor, 10 = excellent): "))

    user_data = pd.DataFrame([{
        "MonsoonIntensity": monsoon,
        "Urbanization": urbanization,
        "DrainageSystems": drainage
    }])

    prediction = model.predict(user_data)[0] * 100
    print(f"\n🔮 Predicted Flood Probability: {prediction:.2f}%")

# Run the prediction with user input
predict_from_user_input()

# Optional: Plot feature importances
importances = pd.Series(model.feature_importances_, index=selected_features)
top_reasons = importances.sort_values(ascending=False)

plt.figure(figsize=(10,5))
sns.barplot(x=top_reasons.values, y=top_reasons.index)
plt.title("Top Features Influencing Flood Prediction")
plt.xlabel("Importance Score")
plt.ylabel("Feature")
plt.tight_layout()
plt.show()
