![CircleCI](https://img.shields.io/circleci/build/github/byverdu/http-server?style=plastic) ![Codecov](https://img.shields.io/codecov/c/github/byverdu/http-server?style=plastic)

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
