pipeline {
    agent any

    environment {
        IMAGE_NAME = 'docker-image:latest'
    }

    stages {
        stage('Create Dockerfile') {
            steps {
                script {
                    
                    writeFile file: 'Dockerfile', text: '''
                    FROM alpine:latest
                    RUN apk add --no-cache curl
                    CMD ["echo", "Hello from the Docker container!"]
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

        stage('Run Docker Image') {
            steps {
                sh 'docker run $IMAGE_NAME'
            }
        }

       
    }
}
