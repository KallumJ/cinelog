# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json /app/yarn.lock /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]