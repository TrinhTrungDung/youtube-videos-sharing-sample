# Step 1: Build frontend app
FROM node:16 as build-stage
WORKDIR /youtube-videos-sharing-frontend
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
# RUN npm run build
CMD npm start