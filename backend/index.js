const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 30001; 
// Middleware
app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sushil98765', 
    database: 'bannerDB'
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});


app.get('/api/banner', (req, res) => {
    const sqlQuery = 'SELECT * FROM banner WHERE id = ?'; 
    const bannerId = 1; // 

    db.query(sqlQuery, [bannerId], (err, results) => {
        if (err) {
            console.error('Error fetching banner data:', err);
            res.status(500).send('Error fetching banner data');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Banner not found');
            return;
        }
        res.json(results[0]);
    });
});


app.post('/api/banner', (req, res) => {
    const { description, timer, link, visible } = req.body;
    const sqlQuery = 'UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = ?';
    const bannerId = 1; 

    db.query(sqlQuery, [description, timer, link, visible, bannerId], (err, results) => {
        if (err) {
            console.error('Error updating banner data:', err);
            res.status(500).send('Error updating banner data');
            return;
        }
        res.status(200).send('Banner updated successfully');
    });
});


app.get('/api/records', (req, res) => {
    const sqlQuery = 'SELECT * FROM your_table_name'; 
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.json(results);
    });
});


app.post('/api/record', (req, res) => {
    const newRecord = req.body;
    const sqlQuery = 'INSERT INTO your_table_name SET ?'; 
    db.query(sqlQuery, newRecord, (err, results) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).send('Error inserting data into database');
            return;
        }
        res.status(201).send('Record added successfully');
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
