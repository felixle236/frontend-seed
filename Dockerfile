FROM node:10.15.3-alpine

# Change working directory
WORKDIR /usr/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install && npm run build

CMD ["npm", "start"]
