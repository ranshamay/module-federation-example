FROM mcr.microsoft.com/cbl-mariner/base/nodejs:16-cm2.0
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build:prod
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "serve" ]