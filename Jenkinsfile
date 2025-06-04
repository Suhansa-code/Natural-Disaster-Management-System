pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-react-app:latest'
        CONTAINER_NAME = 'react-app-container'
    }

    stages {
        stage('Create Dockerfile') {
            steps {
                script {
                    writeFile file: 'Dockerfile', text: '''\
                    # Step 1: Build React app
                    FROM node:18-alpine AS build
                    WORKDIR /app
                    COPY client/package*.json ./
                    RUN npm install --legacy-peer-deps
                    COPY client .
                    RUN npm run dev

                    # Step 2: Serve with nginx
                    FROM nginx:stable-alpine
                    COPY --from=build /app/dist /usr/share/nginx/html
                    EXPOSE 81
                    CMD ["nginx", "-g", "daemon off;"]
                    '''
                }
                sh 'cat Dockerfile'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -e
                    docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    set -e
                    # Stop and remove existing container if running
                    docker rm -f $CONTAINER_NAME || true

                    # Run new container
                    docker run -d --name $CONTAINER_NAME -p 3000:81 $IMAGE_NAME
                '''
            }
        }
      
    }
}
