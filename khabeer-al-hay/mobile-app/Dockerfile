# Build stage
FROM debian:latest AS build-env

# Install Flutter dependencies
RUN apt-get update && \
    apt-get install -y curl git wget unzip libgconf-2-4 gdb libstdc++6 libglu1-mesa fonts-droid-fallback lib32stdc++6 python3 && \
    apt-get clean

# Clone Flutter
RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter

# Add Flutter to PATH
ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:${PATH}"

# Enable web
RUN flutter channel stable && \
    flutter upgrade && \
    flutter config --enable-web

# Copy app files
COPY . /app/
WORKDIR /app

# Get app dependencies
RUN flutter pub get

# Build the app for the web
RUN flutter build web

# Production stage
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build-env /app/build/web /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]