const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

function connectSQL(){
    const con = mysql.createConnection({
        host: "us-cdbr-iron-east-01.cleardb.net",
        user: "bedadae9fdd3d4",
        password: process.env.SQL_PASSWORD
    });
    con.connect(err => {
        if (err) throw err;
        console.log('Connected To SQL Database!');
    });
    return con;
}

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/user', (req, res) => {
    let con = connectSQL();
    res.redirect('/views/users');
    if(req.body.name !== ""){
        let sql = "INSERT INTO `heroku_5cc9dc52e313a97`.`usersurveyresults` (`UserName`, `UserColor`) VALUES ('" + req.body.name + "', '" + parseHex(req.body.color) + "');"
        con.query(sql, (err, result) => { 
            if (err) throw err;
        });
    }
});

function parseHex(hex){
    return hex.replace('#', '');
}

app.get('/users', (req, res) => {
    let con = connectSQL();
    con.query("SELECT * FROM heroku_5cc9dc52e313a97.usersurveyresults;", (err, result) => {
        if (err) throw err;
        res.json(result);
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