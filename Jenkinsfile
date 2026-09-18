pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {

        stage('Build') {
            steps {
                echo 'Installing project dependencies'
                bat 'npm install'

                echo 'Building the application'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated unit tests'
                bat 'npm run unit-test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarCloud code quality analysis'

                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarCloud') {
                        bat "\"${scannerHome}\\bin\\sonar-scanner.bat\""
                    }
                }
            }
        }

        stage('Security') {
            steps {
                echo 'Running dependency security scan with npm audit'
                bat 'npm audit || exit /b 0'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application to staging environment with Docker Compose'
        
                bat '"C:\\Users\\xx201\\.docker\\cli-plugins\\docker-compose.exe" down'
                bat '"C:\\Users\\xx201\\.docker\\cli-plugins\\docker-compose.exe" up --build -d'
        
                echo 'Checking running containers'
                bat '"C:\\Users\\xx201\\.docker\\cli-plugins\\docker-compose.exe" ps'
           }
        }
    }
}
