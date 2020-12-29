
FROM node:14.15.3-buster-slim AS NodeBuilder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
# except .dockerignore
COPY . .
# install node modules and build assets
RUN yarn install
RUN yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
RUN rm /var/log/nginx/access.log \ 
   && rm /var/log/nginx/error.log \ 
   && ln -s /dev/stdout /var/log/nginx/access.log \
   && ln -s /dev/stderr /var/log/nginx/error.log

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=NodeBuilder /app/build .
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
STOPSIGNAL SIGQUIT