pipeline {
  agent any
  tools { nodejs 'NodeJS' }

  parameters {
    choice(name: 'env', choices: ['dev', 'sit', 'uat', 'prod'], description: 'Choose Environment')
  }

  stages {
    stage('Show Info') {
      steps {
        sh '''
          echo "env=${env}"
          node -v
          npm --version
          pwd
        '''
      }
    }
    stage('NPM Install') {
      steps {
        echo 'NPM Installing..'
        checkout scm
        sh 'npm install'
      }
    }
    stage('Build CMS') {
      steps {
        echo 'Building CMS..'
        sh '''
          cd ./cms
          npm run build-cms-lib
          npm run build:$env
        '''
      }
    }
    stage('Build Render') {
      steps {
        echo 'Building Render..'
        sh '''
          cd ./render-engine
          npm run build-render-lib
          npm run build:$env
          cp -R ./dist/render-engine/browser ./dist/render-engine/html
        '''
      }
    }
    stage('Deploying') {
      steps {
        echo 'Deploying..'
        sh '''
          pwd=`pwd`

          if [ "$env" = "dev" ]
          then
            web_server_ip=192.168.0.30
            ssr_server_ip=192.168.0.29
          elif [ "$env" = "sit" ]
          then
            web_server_ip=192.168.0.27
            ssr_server_ip=192.168.0.9
          else
            echo "Environment:[${env}] not support."
            exit 1
          fi

          echo 'deploy cms'
          cms_destination="/root/var/www"
          ssh "root@${web_server_ip}" mkdir -p "${cms_destination}"
          scp -r "${pwd}/cms/dist/cms" "root@${web_server_ip}:${cms_destination}"

          echo 'deploy ssr_browser'
          scp -r "${pwd}/render-engine/dist/render-engine/html" "root@${web_server_ip}:/root/var/www"

          echo 'deploy ssr_server'
          ssr_dist="${pwd}/render-engine/dist/render-engine"
          ssr_destination="/root/dist/render-engine"
          ssh "root@${ssr_server_ip}" mkdir -p "${ssr_destination}/browser" "${ssr_destination}/server"
          scp -r "${ssr_dist}/server" "root@${ssr_server_ip}:${ssr_destination}/server"
          scp -r "${ssr_dist}/browser" "root@${ssr_server_ip}:${ssr_destination}/browser"
          ssh "root@${ssr_server_ip}" node "${ssr_destination}/server/main.js" > /dev/null 2>&1 &
        '''
      }
    }
  }
}
