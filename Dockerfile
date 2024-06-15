# Use the official Node.js image as the base image
FROM node:12

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to start the application
CMD ["yarn", "start"]
