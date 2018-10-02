const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.CLEARDB_GREEN_CLEARDB_HOSTNAME_1,
    user: process.env.CLEARDB_GREEN_CLEARDB_ENVIRONMENT_ID,
    password: process.env.SQL_PASSWORD
});

con.connect(err => {
    if (err) throw err;
    console.log('Connected To SQL Database!');
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/user', (req, res) => {
    res.redirect('/views/users');
    if(req.body.name !== ""){
        let sql = "INSERT INTO `usersurvey`.`usersurveyresults` (`UserName`, `UserColor`) VALUES ('" + req.body.name + "', '" + parseHex(req.body.color) + "');"
        con.query(sql, (err, result) => { 
            if (err) throw err;
        });
    }
});

function parseHex(hex){
    return hex.replace('#', '');
}

app.get('/users', (req, res) => {
    con.query("SELECT * FROM usersurvey.usersurveyresults;", (err, result) => {
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