FROM mcr.microsoft.com/cbl-mariner/base/nodejs:18
WORKDIR /app
ADD package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
ENTRYPOINT ["npm", "run", "serve"]