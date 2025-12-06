# Use Node.js 20 Alpine for smaller image
FROM node:20-alpine

WORKDIR /app

# Copy the standalone build
COPY .next/standalone ./
COPY .next/static ./.next/static

# Copy public folder if it exists
COPY public ./public

# Expose the port
EXPOSE 8080

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]
