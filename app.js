const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cors = require('cors'); 
const indexRouter = require('./backend/index');
// mysql - connection pool
const pool = require('./config/datasource');
// swagger
const { swaggerUi, swaggerJsdoc, swaggerOptions } = require('./config/swagger');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// express
const app = express();
const port = process.env.PORT || 3000; 

// cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// API request (/backend/index.js)
app.use('/api', indexRouter);

// Swagger UI
app.use('/api-docs', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// All other requests are routed to the frontend, except for Swagger UI
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Vue.js build file
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Start Node Server
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;