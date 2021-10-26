## How to run
### Docker
First of all, build and create docker image using `docker build -t web-hw1-go:production .`  
Then just use run.sh at go directory  
You can pass number of instances you want to the script  
Example:  
* `bash run.sh 3`
* This should make 3 instances of go backend.

### Dev
First step into `go` directory install dependencies using `go mod donwload`.  
Then run project by `go run .` command.
