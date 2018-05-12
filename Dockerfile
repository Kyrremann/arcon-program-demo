FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf
COPY puljetider.json /usr/share/nginx/html/puljetider
COPY program.json /usr/share/nginx/html/program
