# Stage 1: Build the application
FROM alpine:latest AS builder

# Install nodejs, npm, and git
RUN apk add --no-cache nodejs npm git

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM alpine:latest

# Install nodejs and npm
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json /app/package-lock.json /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]