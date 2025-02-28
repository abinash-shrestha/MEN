const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.end('welcome to home page');
  }

  if (req.url == '/about') {
    res.end('this is about us page');
  }

  if (req.url == '/contact') {
    res.end('This is contact us is page');
  }

  console.log(req.url);
});

server.listen(3000);
