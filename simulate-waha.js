const http = require('http');

const payload = JSON.stringify({
  event: 'message',
  session: 'Bharani',
  payload: {
    from: '916382288170@c.us',
    to: '911234567890@c.us',
    fromMe: false,
    body: 'Hello! I want to recycle my laptop.',
    timestamp: Math.floor(Date.now() / 1000),
  }
});

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/v1/whatsapp/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`Webhook responded with Status Code: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (error) => {
  console.error('Error sending test message:', error.message);
});

req.write(payload);
req.end();
