# build step

FROM node:16.15 as build
WORKDIR /usr/src/maxmilhas-backend
COPY ./package*.json ./
COPY ./tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build

# run step

FROM node:16.15
WORKDIR /usr/src/maxmilhas-backend
COPY ./package*.json ./
RUN npm install --only=production --ignore-scripts
COPY --from=build /usr/src/maxmilhas-backend/dist ./dist