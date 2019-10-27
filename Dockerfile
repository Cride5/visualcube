FROM php:7.2-apache
RUN apt-get update \
&& apt-get install imagemagick -y \
&& rm -rf /var/lib/apt/lists/*
COPY . /var/www/html
EXPOSE 80
