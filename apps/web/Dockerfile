FROM node:20
WORKDIR /app
COPY package.json svelte.config.js tsconfig.json tailwind.config.cjs postcss.config.cjs ./
RUN npm install
COPY src ./src
RUN npx svelte-kit build
CMD ["node", "build"]
