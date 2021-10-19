#!/bin/bash 

docker run --rm -d --name nginx --network host -v /etc/letsencrypt:/etc/letsencrypt -v /home/ubuntu/projects/web-hw1/nginx/hw1.asdfghj.ir.conf:/etc/nginx/conf.d/default.conf nginx:1.17.6