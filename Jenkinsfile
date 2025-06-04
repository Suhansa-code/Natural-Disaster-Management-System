pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-react-app:latest'
       
    }

    stages {
        stage('Create Dockerfile') {
            steps {
                script {
                    writeFile file: 'Dockerfile', text: '''
                    # Step 1: Build React app
                    FROM node:18-alpine as build
                    WORKDIR /app
                    COPY client/package*.json ./
                    RUN npm install
                    COPY client .
                    RUN npm run build

                    # Step 2: Serve with nginx
                    FROM nginx:stable-alpine
                    COPY --from=build /app/build /usr/share/nginx/html
                    EXPOSE 80
                    CMD ["nginx", "-g", "daemon off;"]
                    '''
                }
                sh 'cat Dockerfile'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:80 $IMAGE_NAME'
            }
        }
    }
}
