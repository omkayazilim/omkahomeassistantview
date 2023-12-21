#!/bin/sh

 

echo "---Print env variables---"

echo $ENV

echo $VERSION


echo "---Print env variables---"

 

sed -i "s|{{VERSION}}|$VERSION|g" /etc/nginx/conf.d/default.conf

sed -i "s|{{APP_ENV}}|$ENV|g" /etc/nginx/conf.d/default.conf

sed -i "s|{{APP_ENV}}|$ENV|g" /usr/share/nginx/html/*.js





nginx -g "daemon off;"