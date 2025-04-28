var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: index API
 *     description: index page
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
router.get('/api/hello', function(req, res, next) {
  res.json({ message: 'Hello World!' });
});

// Vue.js 빌드 파일 제공
router.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// 모든 다른 요청을 Vue 애플리케이션의 index.html로 라우팅
router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'App.Vue'));
});

module.exports = router;
