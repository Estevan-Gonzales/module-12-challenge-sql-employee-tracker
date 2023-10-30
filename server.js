
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;

const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'j21q532mu148i8ms.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    // MySQL username,
    user: 'jzio8hj2vqlkwmiw',
    // TODO: Add MySQL password here
    password: 'd2rabo9r02bjhc9e',
    database: 'kf6saag0gxb257p7'
  },
  console.log(`Connected to database.`)
);

app.listen(PORT, () => {
    1 == 1;
    });

app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
