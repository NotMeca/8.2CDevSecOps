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
        
                bat '"C:\\Users\\xx201\\.docker\\cli-plugins\\docker-compose.exe" down --remove-orphans'
                bat '"C:\\Users\\xx201\\.docker\\cli-plugins\\docker-compose.exe" up --build -d'
        
                echo 'Checking running containers'
                bat '"C:\\Users\\xx201\\.docker\\cli-plugins\\docker-compose.exe" ps'
           }
        }

        stage('Release') {
            steps {
                echo 'Creating versioned release image'
        
                bat '"C:\\Users\\xx201\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" tag sit223-devsecops-goof:latest sit223-goof-release:1.0.%BUILD_NUMBER%'
        
                echo 'Listing release images'
        
                bat '"C:\\Users\\xx201\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" images sit223-goof-release'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking application availability'
        
                bat 'powershell -Command "try { $response = Invoke-WebRequest -Uri http://localhost:3001 -UseBasicParsing; Write-Host \\"Application status: $($response.StatusCode)\\"; if ($response.StatusCode -ne 200) { exit 1 } } catch { Write-Host \\"Application is unavailable\\"; exit 1 }"'
            }
        }
    }
}
