const Bodyparser = require(`body-parser`);
const urlencoded = Bodyparser.json({ extended: true });
const express = require(`express`);
const mysql = require(`mysql`);
const cors = require(`cors`);
const app = express();
const PORT = 8080;

app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: `todo`
});

con.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Database Connected Successfully`);
    }
});

app.post(`/user_Data`, urlencoded, (req, res) => {

    let data = req.body;
    let array = [];
    let name = data.name;
    let id = parseInt(data.id);
    array.push([id, name]);

    let sql = "INSERT INTO user_Details (user_Id, user_Name) VALUES (?);";
    let query = "SELECT * FROM user_Data WHERE user_Id=(?);";

    con.query(sql, array, function (err, result) {
        if (err) {
            con.query(query, id, function (err, result) {
                if (err) {
                    console.log('error');
                } else {
                    res.send(result);
                }
            })
        } else {
            con.query(query, id, function (err, result) {
                if (err) {
                    console.log('error');
                } else {
                    res.send(result);
                }
            })
        }
    });
});

app.get('/user_Validation', urlencoded, (req, res) => {

    let data = parseInt(req.query.id);

    let sql = "SELECT * FROM user_Details WHERE user_Id=(?);";

    con.query(sql, data, function (err, result) {
        if (err) {
            console.log('error');
        } else {
            res.send(result);
        }
    });
})

app.post(`/user_Details`, urlencoded, (req, res) => {

    let data = req.body;
    let array = [];
    let message = data.message;
    let id = parseInt(data.id);
    array.push([id, message]);

    let sql = "INSERT INTO user_Data (user_Id, message) VALUES (?);";
    let query = "SELECT * FROM user_Data WHERE user_Id=(?);";

    con.query(sql, array, function (err, result) {
        if (err) {
            console.log('Error In Connection');
        } else {
            con.query(query, id, function (err, result) {
                if (err) {
                    console.log('error');
                } else {
                    res.send(result);
                }
            });
        }
    });
});

app.post('/is_Completed', urlencoded, function (req, res) {

    let data = req.body;
    let array = [];
    let todo_Id = data.todo_Id;
    let user_Id = data.user_Id;
    data.is_Completed = !data.is_Completed;
    array.push([data.is_Completed]);

    let sql = `UPDATE user_Data SET is_Completed=(?) WHERE todo_Id=${todo_Id}`;
    let query = "SELECT * FROM user_Data WHERE user_Id=(?);";

    con.query(sql, array, function (err, result) {
        if (err) {
            res.send('error in lpopo');
        } else {
            con.query(query, user_Id, function (err, result) {
                if (err) {
                    res.send('error');
                } else {
                    res.send(result);
                }
            });
        }
    })
})

app.put('/todo_Update', urlencoded, (req, res) => {
    let data = req.body;
    let array = [];
    let todo_Id = data.todo_Id;
    let user_Id = data.user_Id;
    let message = data.message;
    array.push([message]);

    console.log('data in msg update ', data);

    let sql = `UPDATE user_Data SET message=(?) WHERE todo_Id=${todo_Id}`;
    let query = "SELECT * FROM user_Data WHERE user_Id=(?);";

    con.query(sql, array, function (err, result) {
        if (err) {
            res.send('error in lpopo');
        } else {
            con.query(query, user_Id, function (err, result) {
                if (err) {
                    res.send('error');
                } else {
                    res.send(result);
                }
            });
        }
    })
})


app.delete('/user_Todo_Delete', urlencoded, (req, res) => {

    let id = parseInt(req.query.id);
    let user_Id = parseInt(req.query.user_id);

    let sql = "DELETE FROM user_Data WHERE todo_Id=(?);";
    let query = "SELECT * FROM user_Data WHERE user_Id=(?);";

    con.query(sql, id, function (err, result) {
        if (err) {
            console.log('error');
        } else {
            con.query(query, user_Id, function (err, result) {
                if (err) {
                    res.send('error');
                } else {
                    res.send(result);
                }
            });
        }
    });
})



app.listen(PORT, () => {
    console.log(`Server started on PORT :`, PORT);
});
