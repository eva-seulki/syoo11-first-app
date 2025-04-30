const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cors = require('cors'); 

// localhost:3000 defualt rendering page
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000; 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// API Document Config (Swagger JSON file derecto)
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API 문서',
      version: '1.0.0',
      description: 'Node.js + Vue Project Swagger API Documents',
    },
  },
  apis: ['./routes/*.js'], // Swagger annotation
};
// Swagger UI 서빙
// SwaggerSpec 설정
const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log(swaggerSpec);

// Swagger UI 서빙
app.use('/api-docs', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');  // 캐시 비활성화
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// TODO - Delete : route test
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// // Vue.js build file (frontend/dist)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// 나머지 모든 요청은 Vue 애플리케이션의 index.html로 라우팅
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start Server
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;