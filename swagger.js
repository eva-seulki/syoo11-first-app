// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'myExpressApp API',
      version: '1.0.0',
      description: 'Node.js Express API with Swagger',
    },
  },
  apis: ['./routes/*.js'], // 주석으로 API 문서 생성할 라우터 경로
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
