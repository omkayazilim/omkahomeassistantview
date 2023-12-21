
FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build /usr/local/app/dist/home-controller/browser /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]