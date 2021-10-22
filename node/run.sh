#!/bin/bash

instances=$1

for i in $(seq $instances);
do
	port="300${i}"
	docker run -d --network host --env PORT=$port --rm --name "webhw1_node_${i}" web-hw1-node:production 
done
