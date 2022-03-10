FROM node:lts AS base

RUN apt-get update && apt-get install -y cron

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build

# RUN ls /app/build/static

# RUN npm install
# RUN npm run build --production
# RUN npm install -g serve

# CMD serve -s build

FROM nginx:latest AS production
#FROM nginx:1.14.2 AS production

COPY --from=base /app/build /var/www/app
COPY ./.nginx/nginx.prod.conf /etc/nginx/nginx.conf

EXPOSE 3080
CMD ["nginx", "-g", "daemon off;"]
