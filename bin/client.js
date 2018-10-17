const http = require('http');
const { token } = require('./token');

const identifier = process.argv[2];
const options = {
  hostname: 'localhost',
  port: 3000,
  path: `/authentication/${identifier}`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

const req = http.request(options, res => {
  res.setEncoding('utf8');
  res.on('data', body => {
    console.log('Body: ' + body);
  });
});

req.write(JSON.stringify({ token }));
req.end();
