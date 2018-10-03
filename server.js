const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const mypool = mysql.createPool({
    connectionLimit: 5,
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "bedadae9fdd3d4",
    password: process.env.SQL_PASSWORD
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/user', (req, res) => {
    res.redirect('/views/users');
    if(req.body.name !== ""){
        let sql = "INSERT INTO `heroku_5cc9dc52e313a97`.`usersurveyresults` (`UserName`, `UserColor`) VALUES ('" + req.body.name + "', '" + parseHex(req.body.color) + "');"
        mypool.getConnection((err, connection) => {
            if(err){
                connection.release();
                console.log(' Error getting database connection: ' + err);
                throw err;
            }
            connection.query(sql, (error, row)=>{
            });
        });
    }
});

function parseHex(hex){
    return hex.replace('#', '');
}

app.get('/users', (req, res) => {
    mypool.getConnection((err, connection) => {
        if(err){
            connection.release();
            console.log(' Error getting database connection: ' + err);
            throw err;
        }
        connection.query("SELECT * FROM heroku_5cc9dc52e313a97.usersurveyresults;", (error, row)=>{
            res.json(row);
        });
    });
});

app.get('/views/users', (req, res) => {
    res.sendFile(__dirname + '/users.html');
});

app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + '/main.js');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});
app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));