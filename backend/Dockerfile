ROM node:alpine

WORKDIR /app

COPY /package*.json /app/
COPY /yarn.lock /app/
COPY /tsconfig.json /app/
COPY prisma /app/prisma
COPY .env ./
COPY . /app/

RUN apk update && apk add postgresql-client
RUN npm install
RUN npx prisma generate

EXPOSE 3001

CMD npm run dev
