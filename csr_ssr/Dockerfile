FROM mcr.microsoft.com/cbl-mariner/base/nodejs:16.17.1-2-cm2.0.20221203-amd64
WORKDIR /app
ARG PAT
COPY package.json package-lock.json .npmrc .
RUN echo ${PAT}
RUN sed -i "s/BASE64_ENCODED_PERSONAL_ACCESS_TOKEN/$PAT/g" .npmrc

RUN npm install -v
COPY . .
RUN npm run build
EXPOSE 3001
ENTRYPOINT [ "npm", "run", "serve" ]