FROM node:16.15 as build
WORKDIR /usr/src/maxmilhas
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate