package grpc

import (
	"context"
	"fmt"
	pb "github.com/morix1500/grpc-web-nginx/server/proto"
	"google.golang.org/grpc"
	"net"
)

type HelloService struct{}

func (h HelloService) Run() int {
	s := grpc.NewServer()
	pb.RegisterHelloServiceServer(s, h)

	lis, err := net.Listen("tcp", ":5000")
	if err != nil {
		fmt.Printf("%+v\n", err)
		return 1
	}
	if err := s.Serve(lis); err != nil {
		fmt.Printf("%+v\n", err)
		return 1
	}

	return 0
}

func (h HelloService) Hello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloResponse, error) {
	return &pb.HelloResponse{
		Message: "Hello, " + in.Name,
	}, nil
}
