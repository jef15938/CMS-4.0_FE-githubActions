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
RUN npm run build-render-lib
RUN npm run build:ssr
CMD [ "npm", "run","serve:ssr" ]
