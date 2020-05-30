import React, { useState } from "react";

import { HelloServiceClient } from "../assets/_proto/hello_grpc_web_pb";
import { HelloRequest } from "../assets/_proto/hello_pb";

const helloClient = async name =>
  await fetch("http://localhost:3000/api/hello?name=" + name).then(response => {
    console.log({ response });
    return response.json();
  });

const App = ({ data }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const hello = () => {
    let req = new HelloRequest();
    req.setName(name);
    const client = new HelloServiceClient("https://127.0.0.1:8080", {}, {});
    client.hello(req, {}, (err, ret) => {
      setMessage(ret.getMessage());
    });
  };

  return (
    <div>
      <h1>Test</h1>
      <div>
        <input
          type="input"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <button onClick={hello}>send</button>
        <p>gRPC-web: Message: {message}</p>
        <p>gRPC-node(SSR): {data}</p>
      </div>
    </div>
  );
};

App.getInitialProps = async () => {
  const serverResponce = await helloClient("SSR");
  console.log({ serverResponce });
  if (serverResponce.err) {
    return { data: serverResponce.err };
  }
  return { data: serverResponce };
};

export default App;
