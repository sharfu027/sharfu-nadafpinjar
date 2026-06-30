FROM node:22-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the files
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
