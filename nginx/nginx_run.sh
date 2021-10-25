#!/bin/bash 

docker run --rm -d --name nginx --network host -v /etc/letsencrypt:/etc/letsencrypt -v /home/ubuntu/projects/web-hw1/nginx/hw1.asdfghj.ir.conf:/etc/nginx/conf.d/default.conf -v /home/ubuntu/projects/web-hw1/front/sha256.html:/usr/share/nginx/html/sha256.html:ro nginx:1.17.6
