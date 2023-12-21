
FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build /usr/local/app/dist/omkahomeassistantview/browser /usr/share/nginx/html
ADD  nginx.conf /etc/nginx/conf.d/default.conf
ADD  docker-entrypoint.sh /usr/bin/docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]