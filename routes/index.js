var express = require('express');
var router = express.Router();

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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
