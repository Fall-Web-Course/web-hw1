## How to run
1- Install requirements with `pip install -r requirements.txt`  
2- Run locust web client with `locust -f main.py -H https://hw1.asdfghj.ir`  

## Notes

* locust is already deployed on [locust.hw1.asdfghj.ir](http://locust.hw1.asdfghj.ir)
* you can't access w/o password :))

## Tests Results (350 RPS)
### 1 Node & 1 Go
*   node: 17% ~ 22% cpu, 61 MiB Memory
*   go: 7% ~ 9% cpu, 5.5 MiB Memory
### 3 Node & 3 Go
*   node: 9% ~ 11% cpu, 57 MiB Memory (on average)
*   go: 3.5% ~ 5% cpu, 6.2 MiB Memory (on average)
### 5 Node & 5 Go
*   node: 7% ~ 8.5% cpu, 55 MiB Memory (on average)
*   go: 2.3% ~ 3.1% cpu, 6.1 MiB Memory (on average)

## Locust Chart for 3 Node & 3 Go
![image](locust_3go_3node.png?raw=true)