![Codecov](https://img.shields.io/codecov/c/github/byverdu/http-server?style=plastic) ![Github](https://img.shields.io/github/checks-status/byverdu/http-server/master?style=plastic) ![lastCommit](https://img.shields.io/github/last-commit/byverdu/http-server?style=plastic)

# http-server

This package is meant to be used as a quick way to setup an Express application

## How to use it

```sh
# install the module

> yarn add -D @byverdu/http-server
```

```js
// index.js
import { httpServer } from "@byverdu/http-server";
import path from 'path';

const routes = [
  {
    method: 'get',
    path: '/some-path',
    handler: (req, res) => {

      res.sendFile(path.resolve('./index.html'))
    }
  }
]

httpServer({port: 9000, routes})
```
