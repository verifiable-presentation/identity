# dockerfile
# This file contains instructions for Docker to build a Docker image for the
# Identity API server.

# Run the server using the official Node 18 image as a base.
FROM node:18
# Install pnpm, so we can install dependencies and run the server.
RUN npm install -g pnpm

# Create and change to the app directory.
WORKDIR /usr/src/app
# Copy over the code to the app directory.
COPY ./. ./
# Install all dependencies (including development dependencies, so we can patch
# the packages that need patching).
RUN pnpm install

# Run the server on container startup.
EXPOSE 56482
CMD ["pnpm", "start"]
