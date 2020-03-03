const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({ extended: true });
const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'application'
});

con.connect(function (err) {
    if (err) console.log(err);
    console.log('Database Connected Successfully');
});

app.get('/user_Details', urlencoded, (req, res) => {
    let sql = 'SELECT * FROM userRegisterationDetails';

    con.query(sql, (err, res) => {
        if (err) {
            console.log('error in get');
        } else {
            res.send('res');
        }
    })
})

app.get('/user_Mail_Check', urlencoded, (req, res) => {
    let mailId = req.query.mailId;
    let sql = 'SELECT * FROM userRegisterationDetails WHERE userMailId=(?)';

    con.query(sql, mailId, (err, result) => {
        if (err) {
            console.log('error in get');
            return res.send('error');
        } else {
            console.log('mailid', mailId);
            console.log('in get pass', result);
            return res.send(result);
        }
    })
})

app.post('/user_Details_Post', urlencoded, async (req, res) => {
    let data = req.body;
    let passArray = [];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    passArray.push([data.userName, hashedPassword, data.mailId, data.phoneNumber]);
    let sql = 'INSERT INTO `userRegisterationDetails`(`userName`, `userPassword`, `userMailId`, `userPhonNumber`) VALUES (?)';

    con.query(sql, passArray, function (err, result) {
        if (err) {
            console.log('error in post', err);
        } else {
            let query = 'SELECT * FROM `userRegisterationDetails`';
            con.query(query, function (err, result) {
                if (err) {
                    console.log('error');
                } else {
                    res.send(result);
                }
            })
        }
    })
})



app.listen(PORT, () => {
    console.log('started on', PORT);
});


// const pass = await bcrypt.compare(req.body.password, user.password);