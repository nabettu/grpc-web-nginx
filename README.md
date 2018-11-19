# generate proto files
```shell
mkdir -p client/assets/_proto
mkdir -p server/proto

docker run --rm -v $(pwd):$(pwd) \
-w $(pwd) znly/protoc:0.4.0 \
-I ./proto \
--js_out=import_style=commonjs,binary:./client/assets/_proto \
--go_out=plugins=grpc:./server/proto/ \
--grpc-web_out=import_style=commonjs,mode=grpcweb:./client/assets/_proto \
proto/hello.proto \
```
