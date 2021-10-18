#!/bin/bash

instances=$1

for i in $(seq $instances);
do
	port="808${i}"
	docker run -d --network host --env PORT=$port --rm --name "webhw1_${i}" web-hw1:production 
done
