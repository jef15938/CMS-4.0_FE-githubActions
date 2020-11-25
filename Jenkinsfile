pipeline {
  agent any
  tools { nodejs 'NodeJS' }

  environment {
    deploy_env = 'dev'
    folder_cms = 'cms'
    folder_render = 'render-engine'
    destination_cms = '/opt/Tomcat9/webapps/cms'
    destination_static_files = '/var/www'
    destination_ssr = '/dist/render'
    multi_sites = 'oiu,en,freeway'
    ip_web_server = '192.168.0.33'
    ip_ssr_server = '192.168.0.32'
  }

  stages {
    stage('Show Info') {
      steps {
        script {
          currentBuild.displayName = "#${currentBuild.number} : ${env.deploy_env}"
        }
        script {
          env.multi_sites.tokenize(',').each { site ->
            echo "Sites include ${site}"
          }
        }
        sh """
          echo "deploy_env=${env.deploy_env}"
          echo "env.ip_web_server = ${env.ip_web_server}"
          echo "env.ip_ssr_server = ${env.ip_ssr_server}"
          echo "env.destination_cms = ${env.destination_cms}"
          echo "env.destination_ssr = ${env.destination_ssr}"
          echo "env.WORKSPACE = ${env.WORKSPACE}"
          node -v
          npm --version
        """
      }
    }
    stage('NPM Install') {
      steps {
        echo 'NPM Installing..'
        checkout scm
        sh """
          cd "./${env.folder_cms}"
          npm install
        """
        sh """
          cd "./${env.folder_render}"
          npm install
        """
      }
    }
    stage('Build CMS') {
      steps {
        echo 'Building CMS..'
        sh """
          cd "./${env.folder_cms}"
          npm run build:"${env.deploy_env}"
        """
      }
    }
    stage('Build Render') {
      steps {
        echo 'Building Render..'
        sh """
          cd "./${env.folder_render}"
          npm run build-render-lib
          npm run build:"${env.deploy_env}"
        """
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying..'
        script {
          echo 'deploy cms'
          sh "ssh root@${env.ip_ssr_server} mkdir -p ${env.destination_cms}"
          sh "scp -r ${env.WORKSPACE}/${env.folder_cms}/dist/${env.folder_cms}/. root@${env.ip_ssr_server}:${env.destination_cms}/."
        }
        script {
          echo 'deploy ssr_browser : main site'
          sh "ssh root@${env.ip_web_server} mkdir -p ${env.destination_static_files}/html"
          sh "ssh root@${env.ip_web_server} sudo find ${env.destination_static_files}/html -maxdepth 1 -name \'assets\' -o -name \'*.js\' -o -name \'*.css\' -o -name \'index.html\' | xargs rm -rf"
          sh "scp -r ${env.WORKSPACE}/${env.folder_render}/dist/${env.folder_render}/browser/. root@${env.ip_web_server}:${env.destination_static_files}/html"
        }
        script {
          echo 'deploy ssr_browser : multi sites'
          env.multi_sites.tokenize(',').each { site ->
            echo "deploy ssr_browser : multi sites, site = ${site}"
            sh "ssh root@${env.ip_web_server} mkdir -p ${env.destination_static_files}/${site}"
            sh "ssh root@${env.ip_web_server} sudo find ${env.destination_static_files}/${site} -maxdepth 1 -name \'assets\' -o -name \'*.js\' -o -name \'*.css\' -o -name \'index.html\' | xargs rm -rf"
            sh "scp -r ${env.WORKSPACE}/${env.folder_render}/dist/${env.folder_render}/browser/. root@${env.ip_web_server}:${env.destination_static_files}/${site}"
            sh "node ${env.WORKSPACE}/${env.folder_render}/dist/${env.folder_render}/browser/getIndexHtmlBySiteId.js --site=${site}"
            sh "scp ${env.WORKSPACE}/${env.folder_render}/dist/${env.folder_render}/browser/index-${site}.html root@${env.ip_web_server}:${env.destination_static_files}/${site}/index.html"
            sh "rm -f ${env.WORKSPACE}/${env.folder_render}/dist/${env.folder_render}/browser/index-${site}.html"
          }
        }
        script {
          echo 'deploy ssr_server'
          sh "ssh root@${env.ip_ssr_server} mkdir -p ${env.destination_ssr}"
          sh "scp -r ${env.WORKSPACE}/${env.folder_render}/dist/${env.folder_render}/. root@${env.ip_ssr_server}:${env.destination_ssr}"
        }
      }
    }
    stage('Restart') {
      steps {
        script {
          echo 'Restart SSR'
          sh "ssh root@${env.ip_ssr_server} sudo systemctl restart render"
        }
      }
    }
  }
}
