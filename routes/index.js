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

module.exports = router;
