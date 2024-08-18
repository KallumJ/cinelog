# Use the latest Alpine image
FROM alpine:latest

# Install nodejs, npm, and git
RUN apk add --no-cache nodejs npm git

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma db push

# Build the Next.js application
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
