FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --legacy-peer-deps 
ADD . .
RUN npm run build
RUN npm prune --prodaction --legacy-peer-deps
CMD ["node", "./dist/main.js"]
