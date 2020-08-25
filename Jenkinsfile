pipeline {
  agent any
  stages {
    stage('Pull repo') {
      parallel {
        stage('Pull repo') {
          steps {
            sh 'git pull'
            sleep 2
          }
        }

        stage('test') {
          steps {
            timestamps() {
              ws(dir: 'root') {
                sleep 3
              }

            }

          }
        }

      }
    }

    stage('OK') {
      parallel {
        stage('OK') {
          steps {
            echo 'OK!'
          }
        }

        stage('FAIL') {
          steps {
            echo 'FAIL'
          }
        }

      }
    }

  }
}