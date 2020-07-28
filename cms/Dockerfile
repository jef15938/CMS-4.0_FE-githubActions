FROM node:12-alpine3.11

WORKDIR /usr/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .npmrc /root/.npmrc

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

RUN npm run pack-cms
RUN npm run install-cms
CMD [ "npm", "run","start:prod" ]
EXPOSE 3000
