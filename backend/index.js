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
 * tags:
 *   - name: Dashboard
 *     description: API related to dashboard.
 */
/**
 * @swagger
 * /api/dashboard/line-chart:
 *   get:
 *     summary: Get linechart data
 *     description: Retrieve monthly data for Mobile apps and Websites.
 *     tags:
 *       - Chart
 *     responses:
 *       200:
 *         description: Chart data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: string
 *                 datasets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                       data:
 *                         type: array
 *                         items:
 *                           type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/dashboard/line-chart', function (req, res) {
  const sql = `
                SELECT month,
                       MAX(CASE WHEN category = 'Mobile apps' THEN value END) AS mobile_apps,
                       MAX(CASE WHEN category = 'Websites' THEN value END) AS websites
                  FROM line_chart
              GROUP BY month
              ORDER BY FIELD(month, 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
              `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Database query failed:', err.sqlMessage);
      return res.status(500).json({ message: 'Database query failed' });
    }

    const labels = results.map(row => row.month);
    const mobileApps = results.map(row => row.mobile_apps);
    const websites = results.map(row => row.websites);

    res.json({
      labels,
      datasets: [
        {
          label: 'Mobile apps',
          data: mobileApps,
        },
        {
          label: 'Websites',
          data: websites,
        }
      ]
    });
  });
});

/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: API related to authors.
 */

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
  const sql = `
              SELECT ID, CREATE_DATE, IMG_DIR, NAME, EMAIL, JOB_TITLE, SUB_SUBTITLE, STATUS, EMPLOYED_DATE, IS_DELETED 
                FROM authors
               WHERE IS_DELETED = 0;
            `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Database query failed:', err.sqlMessage); 
      res.status(500).send('Database query failed');
      return;
    }
    res.json(results); // return json format data
  });
});

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
 *     description: Update an author's details by their ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the author to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NAME:
 *                 type: string
 *               EMAIL:
 *                 type: string
 *               JOB_TITLE:
 *                 type: string
 *               STATUS:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Author updated successfully"
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Author not found or is marked as deleted
 *       500:
 *         description: Internal server error
 */
router.put('/authors/:id', function(req, res, next) {
  const authorId = req.params.id; // ID
  const { NAME, EMAIL, JOB_TITLE, SUB_SUBTITLE, STATUS } = req.body; // Data
  
  if (!NAME || !EMAIL || !JOB_TITLE || !SUB_SUBTITLE || !STATUS) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const sql = `
              UPDATE authors 
                 SET 
                     NAME = ?, 
                     EMAIL = ?, 
                     JOB_TITLE = ?, 
                     SUB_SUBTITLE = ?,
                     STATUS = ? 
               WHERE ID = ? AND IS_DELETED = 0
              `;
  pool.query(sql , [NAME, EMAIL, JOB_TITLE, SUB_SUBTITLE, STATUS, authorId], (err, results) => {
    if (err) {
      console.error('Database query failed:', err.sqlMessage);
      return res.status(500).send('Database query failed');
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Author not found or is marked as deleted' });
    }

    res.json({ message: 'Author updated successfully' });
  });
});

module.exports = router;
