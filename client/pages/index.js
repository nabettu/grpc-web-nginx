import React, { useState } from "react";
import { HelloServiceClient } from "../assets/_proto/hello_grpc_web_pb";
import { HelloRequest } from "../assets/_proto/hello_pb";

export default () => {
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
        <p>Message: {message}</p>
      </div>
    </div>
  );
};
