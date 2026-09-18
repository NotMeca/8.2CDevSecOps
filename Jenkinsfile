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
        echo 'Running Snyk security scan'

        bat 'npx snyk test || exit /b 0'
    }
}

