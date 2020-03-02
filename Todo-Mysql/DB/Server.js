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
    if (err) console.log(err);
    console.log('Database Connected Successfully');
});

app.get('/data', urlencoded, (req, res) => {
    var data = parseInt(req.query.id);
    var sql = "SELECT todoid,todomessages FROM usertodos WHERE userid = ?;"

    con.query(sql, data, function (err, result) {
        if (err) res.send('error');
        console.log('Data Fetched By Id');
        res.send(result);
    });

});

app.get('/userdetials', urlencoded, (req, res) => {
    var data = parseInt(req.query.id);
    var sql = "SELECT * FROM userdetials WHERE userid = ?;"

    con.query(sql, data, function (err, result) {
        if (err) res.send('error');
        console.log('Data Fetched By Id');
        res.send(result);
    });

});

app.post('/userlogin', urlencoded, (req, res) => {
    var data = req.body;
    var array = [];
    var sql = "INSERT INTO userdetials (userid ,username) VALUES (?)"

    array.push([parseInt(data.userid), data.name]);

    con.query(sql, array, function (err, result) {
        if (err) return res.send('error');
        console.log('User Pushed In')
        return res.send(result);
    });

});

app.post(`/usertodo`, urlencoded, (req, res) => {

    var data = req.body;
    var message = data.message;
    var array = [];
    var id = parseInt(data.userid);
    var sql = "INSERT INTO usertodos (userid, todomessages)  VALUES (?)";
    var querry = "SELECT todoid,todomessages FROM usertodos WHERE userid = ?;"

    array.push([id, message]);

    con.query(sql, array, function (err, result) {
        if (err) res.status(100).send('Error In Connection');
        console.log('Todo Pushed In To Current User');

        con.query(querry, id, function (err, resultOfFetched) {
            if (err) res.status(100).send('error');
            console.log('Data Fetched By Id');
            res.status(200).send(resultOfFetched);
        });
    });

});

app.listen(PORT, () => {
    console.log('started on', PORT);
});
