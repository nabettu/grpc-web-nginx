# local用の証明書発行手順

```shell
$ brew install mkcert
$ mkcert -install
$ mkcert localhost 127.0.0.1
$ mv localhost+1* keys/.
```
