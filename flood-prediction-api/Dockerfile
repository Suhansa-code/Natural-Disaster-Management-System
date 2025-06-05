# Use official Python image
FROM python:3.10-slim-bookworm

# Set working directory
WORKDIR /app

# Install OS dependencies for matplotlib and others
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Expose Flask port
EXPOSE 5001

# Run the Flask app
CMD ["python", "flood_model_server.py"]
