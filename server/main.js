const static = require('./static.js');
const dynamic = require('./dynamic.js')
const http = require('http');

exports.server = {};

// setter for routes - adding to routes
const server = {}

server.setAllowedPaths = paths => {
  dynamic.routes = { ...dynamic.routes, ...paths}
}

// server

const httpServer = http.createServer((req, res) => {;
  const baseURL = 'http://' + req.headers.host + '/';
  const myURL = new URL(req.url, baseURL);
  const urlcon = new URL(myURL);
  const pathname = urlcon.pathname 

  const handler2 = dynamic.routes[pathname] ? dynamic.routes[pathname] : false;
  if (!handler2) {
    static.get(pathname, res);
  } else {
    dynamic.get(urlcon, req, res)
  }
});

// public methods

server.init = (port = 3001, host = '127.0.0.1') => {
  httpServer.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`);
  })
};

module.exports = server;

 