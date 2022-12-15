FROM mcr.microsoft.com/cbl-mariner/base/nodejs:16.17.1-2-cm2.0.20221203-amd64
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "serve" ]