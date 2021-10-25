#!/bin/bash 

docker run --rm -d --name nginx --network host -v /etc/letsencrypt:/etc/letsencrypt -v /home/ubuntu/projects/web-hw1/nginx/hw1.asdfghj.ir.conf:/etc/nginx/conf.d/default.conf -v /home/ubuntu/projects/web-hw1/front/:/var/www/data/html nginx:1.17.6