const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Import routes
const server = require('./qr');
const code = require('./pair');

// Increase listener limit
require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/server', server);
app.use('/code', code);

app.get('/pair', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'pair.html'));
});

app.get('/qr', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'qr.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'main.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
✅ Server running on http://localhost:${PORT}
⭐ Don't forget to give a star!
  `);
});

module.exports = app;
