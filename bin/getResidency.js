
const http = require('http');

try {
  const jwt = process.argv[2];
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/residency',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const req = http.request(options, res => {
    res.setEncoding('utf8');
    res.on('data', body => {
      console.log('Body: ' + body);
    });
  });

  req.write(JSON.stringify({ jwt }));
  req.end();
} catch (error) {
  console.log(error);
}
