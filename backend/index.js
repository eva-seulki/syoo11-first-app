var express = require('express');
var router = express.Router();
var path = require('path');
var { pool } = require('../config/datasource'); 
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
  pool.query('SELECT * FROM my_table', (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      res.status(500).send('Database query failed');
      return;
    }
    res.json(results); // return json format data
  });
});

module.exports = router;
