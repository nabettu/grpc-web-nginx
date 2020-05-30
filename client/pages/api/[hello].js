import grpc from "grpc";
import { HelloServiceClient } from "../../assets/node/proto/hello_grpc_pb.js";
import { HelloRequest } from "../../assets/node/proto/hello_pb";

const helloClient = async (request, responce) => {
  const name = request.query.name;
  let req = new HelloRequest();
  req.setName(name);
  console.log("connect");
  const client = new HelloServiceClient(
    "http://localhost:5000",
    grpc.credentials.createInsecure()
  );
  return client.hello(req, (err, res) => {
    console.log({ err, res });
    if (err) {
      console.error(err);
      responce.status(400).json({
        err: err.message,
      });
    } else {
      responce.json({
        message: res, //.getMessage(),
      });
    }
  });
};

export default helloClient;
