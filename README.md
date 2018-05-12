Arcon program demo
==================

A simple web site for showing Arcon program for the mobile user.

Demo: https://kyrremann.github.io/arcon-program-demo/

## Technology
* ListJS
* Purecss

## Testing with Docker

`docker build -t arcon-nginx .`

`docker run --rm -d -p 8080:80 arcon-nginx`

Open `index.html` in your favorit browser.