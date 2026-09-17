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
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests'
                bat 'npm test'
            }
        }
    }
}
