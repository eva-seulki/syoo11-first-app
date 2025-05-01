// mysql
const mysql = require('mysql2');

// Azure MySQL Connection Pool
const pool = mysql.createPool ({
    host: 'syoo11-mysql.mysql.database.azure.com',  
    user: 'admin1', 
    password: 'a1234567!!',  
    database: 'syoo11_db',  
    waitForConnections: true,
    connectionLimit: 10,  // 연결 풀 크기
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: true // 기본적으로 true, 테스트용은 false
    }
  });

  module.exports = { pool };