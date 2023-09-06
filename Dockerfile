# build environment
FROM node:16-alpine as build
#ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY ./package*.json /app/
COPY ./yarn.lock /app/
RUN yarn 

# Copy app files
COPY . /app
COPY ./.env.dev /app/.env

# Build the app
RUN yarn build

# production environment
FROM nginx:stable-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

# Static build
COPY --from=build /app/dist /usr/share/nginx/html

# Default port exposure
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
