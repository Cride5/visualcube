from php:7.4-apache

RUN apt update
RUN apt install --yes imagemagick

COPY . /var/www/html/
