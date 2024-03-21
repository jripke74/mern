const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<h1>Hello</h1>');
    return res.end();
  }
});

server.listen(3000);
