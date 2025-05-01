// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'myExpressApp API',
      version: '1.0.0',
      description: 'Node.js + Vue Project Swagger API Documents',
    },
  },
  apis: ['./backend/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerJsdoc, swaggerOptions };
