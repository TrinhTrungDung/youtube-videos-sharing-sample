# Step 1: Build frontend app
FROM node:16 as build-stage
WORKDIR /youtube-videos-sharing-frontend
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build

# Stage 2: 
FROM nginx:1.21.6
COPY --from=build-stage /youtube-videos-sharing-frontend/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT
CMD nginx -g 'daemon off;'