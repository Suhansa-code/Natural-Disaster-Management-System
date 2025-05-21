# Use Node.js 18 LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose your port (use 4000 by default from your code)
EXPOSE 4000

# Run the backend server
CMD ["node", "server.js"]
