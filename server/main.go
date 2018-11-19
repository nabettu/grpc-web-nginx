package main

import (
	"github.com/morix1500/grpc-web-nginx/server/grpc"
	"os"
)

func main() {
	os.Exit(start())
}

func start() int {
	s := grpc.HelloService{}
	return s.Run()
}
