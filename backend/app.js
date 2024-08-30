// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // ou tout autre port que tu choisis

// Middleware
app.use(bodyParser.json());

// Routes
const possessionRoutes = require('./routes/possessionRoutes');
const patrimoineRoutes = require('./routes/patrimoineRoutes');

app.use('/possession', possessionRoutes);
app.use('/patrimoine', patrimoineRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
