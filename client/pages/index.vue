<template>
  <div>
    <h1>Test</h1>
    <div>
      <input type="input" v-model="name" />
      <button @click="hello">send</button>
      <p>Message: {{ message }}</p>
    </div>
  </div>
</template>
<script>
import {grpc} from "grpc-web-client"
import {HelloServiceClient} from "~/assets/_proto/hello_grpc_web_pb"
import {HelloRequest, HelloResponse} from "~/assets/_proto/hello_pb"
 export default {
  asyncData() {
    return {
      name: "",
      message: "",
    }
  },
  methods: {
    hello() {
      let req = new HelloRequest()
      req.setName(this.name)

      const client = new HelloServiceClient("https://127.0.0.1:8080", {}, {})
      client.hello(req, {}, (err, ret) => {
        this.message = ret.getMessage()
      })
    }
  }
}
</script>
