FROM node:20
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install --production
COPY src ./src
RUN npx tsc
CMD ["node", "dist/index.js"]
