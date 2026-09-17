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
    }
}
