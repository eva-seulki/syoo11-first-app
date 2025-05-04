var express = require('express');
var router = express.Router();
var path = require('path');
var { pool } = require('../config/datasource'); 
/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Test API
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
 *                   example: [{"id":1,"create_time":"1925-05-01T15:00:00.000Z","name":"seulki yoo"}]
 */
router.get('/hello', function(req, res, next) {
  pool.query('SELECT * FROM my_table', (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      res.status(500).send('Database query failed');
      return;
    }
    res.json(results); // return json format data
  });
});
/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get list of authors
 *     description: Retrieve a list of all authors.
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *           description: Primary Key
 *         CREATE_DATE:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *         NAME:
 *           type: string
 *           description: Author name
 *         EMAIL:
 *           type: string
 *           description: Author email
 *         JOB_TITLE:
 *           type: string
 *           description: Job title
 *         SUB_SUBTITLE:
 *           type: string
 *           description: Sub title
 *         STATUS:
 *           type: string
 *           description: Status (Online/Offline)
 *         EMPLOYED_DATE:
 *           type: string
 *           format: date-time
 *           description: Employed date
 *         IS_DELETED:
 *           type: boolean
 *           description: Soft delete flag
 *         IMG_DIR:
 *           type: string
 *           description: Image directory
 */

router.get('/authors', function(req, res, next) {
  pool.query(`
              SELECT CREATE_DATE, IMG_DIR, NAME, EMAIL, JOB_TITLE, SUB_SUBTITLE, STATUS, EMPLOYED_DATE, IS_DELETED 
                FROM authors
               WHERE IS_DELETED = 0;
            `, (err, results) => {
    if (err) {
      console.error('Database query failed:', err.sqlMessage); 
      res.status(500).send('Database query failed');
      return;
    }
    res.json(results); // return json format data
  });
});

module.exports = router;
