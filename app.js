const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cors = require('cors'); 
// localhost:3000 defualt rendering page
const indexRouter = require('./routes/index');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
// mysql - connection pool
const pool = require('./datasource');

const app = express();
const port = process.env.PORT || 3000; 

// cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use('/', indexRouter);

// API Document Config (Swagger JSON file derecto)
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '1.0.0',
      description: 'Node.js + Vue Project Swagger API Documents',
    },
  },
  apis: ['./routes/*.js'], // Swagger annotation
};

// SwaggerSpec Config
const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log(swaggerSpec);

// Swagger UI
app.use('/api-docs', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Vue.js build file (frontend/dist)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Route all the other request to frontend Vue+Vite
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;