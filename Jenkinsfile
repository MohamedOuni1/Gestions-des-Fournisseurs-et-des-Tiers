pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')  
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') 
        IMAGE_NAME_SERVER = 'sbika/serverabdelli'  
        IMAGE_NAME_CLIENT = 'sbika/clientabdelli' 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MohamedSbika/abdellino_store'
            }
        }

        stage('Build Server Image') {
            steps {
                dir('api') {
                    script {
                        dockerImageServer = docker.build("${IMAGE_NAME_SERVER}")
                    }
                }
            }
        }

        stage('Build Client Image') {
            steps {
                dir('client') {
                    script {
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}")
                    }
                }
            }
        }

        stage('Test Docker Hub Login') {
            steps {
                sh '''
                echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    sh """
                    echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                    docker push ${IMAGE_NAME_SERVER}
                    docker push ${IMAGE_NAME_CLIENT}
                    """
                }
            }
        }
    }
}
