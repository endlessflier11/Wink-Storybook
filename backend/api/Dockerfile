# FROM node:12 as development

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# Below only runs when the target is production

# FROM node:12 as production
FROM node:16.11.1

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node", "src/main"]