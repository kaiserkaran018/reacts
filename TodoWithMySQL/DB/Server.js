const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({ extended: true });
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'todolist'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Database Connected Successfully');
});


app.get(`/alltodos`, async (req, res) => {
    con.query("SELECT * FROM usertodos", function (err, result) {
        if (err) {
            res.status('100').send('Error In Connection');
        } else {
            console.log('Data Fetched');
            res.send(result);
        }
    });
});

app.get('/data', urlencoded, function (req, res) {
    var data = parseInt(req.query.id);
    var sql = "SELECT todoid,todomessages FROM usertodos WHERE userid = ?;"
    con.query(sql, data, function (err, result) {
        if (err) {
            res.json({ error: err });
        } else {
            console.log('Data Fetched By Id');
            res.json({ result });
        }
    });

});

app.post('/userlogin', urlencoded, function (req, res) {
    var data = req.body;
    var array = [];
    array.push([parseInt(data.userid), data.name]);

    var sql = "INSERT INTO userdetials (userid ,username) VALUES (?)"
    con.query(sql, array, function (err, result) {
        if (err) {
            return res.json('error');
        } else {
            console.log('User Pushed In')
            return res.json(result);
        }
    });
});

app.post(`/usertodo`, urlencoded, (req, res) => {

    var data = req.body;
    var array = [];
    array.push([parseInt(data.userid), data.message]);

    var sql = "INSERT INTO usertodos (userid, todomessages)  VALUES (?)";
    con.query(sql, array, function (err, result) {
        if (err) {
            res.status(100).send('Error In Connection');
            throw (err);
        } else {
            console.log('Todo Pushed In To Current User');
            res.status(200).send(result);
        }
    });
});


app.listen(PORT, () => {
    console.log('started on', PORT);
});
