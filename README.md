![Codecov](https://img.shields.io/codecov/c/github/byverdu/http-server?style=plastic) ![Github](https://img.shields.io/github/checks-status/byverdu/http-server/master?style=plastic) ![lastCommit](https://img.shields.io/github/last-commit/byverdu/http-server?style=plastic)

# http-server

This package is meant to be used as a quick way to setup an Express application. The module does not have too much defined. The default functionality is the following.

- `cors` enabled
- logs using `morgan`
- static assets served from `express.static('public')`
- `/health` endpoint to verify that the app is running.

## Params

Pass an object with the following properties::

```ts
interface Route {
  method: 'get' | 'delete' | 'post' | 'put' | 'patch'
  path: string // must start with "/"
  handler: function(Request, Response)
}

interface Params {
  port?: number  // defaults to 3000
  middleware?: Array<Express middleware> // defaults to []
  routes: Array<Route>
}
```

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

httpServer({routes})
```

In order to serve static files create a `public` folder and place them inside there.
