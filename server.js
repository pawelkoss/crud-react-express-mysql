const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());  
app.use(cors());

require("dotenv").config();

//db conn
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Listen on port ' + process.env.PORT)
});

app.get("/mybooks", (req, res) => {
    db.query("SELECT * FROM mybooks", (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello World! from server.js')
  }); 

app.post("/newbook", (req, res) => {
    const queryInsert = "INSERT INTO mybooks SET ?";
    db.query(queryInsert, req.body, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.send("Book added to database");
        }
    })
})

app.put("/mybooks", (req, res) => {
    const queryUpdate = "UPDATE mybooks SET title = ?, author = ?, pages= ?, rating = ? WHERE id = ?";
    db.query(queryUpdate, [req.body.title, req.body.author, req.body.pages, req.body.rating, req.body.id],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.send(result);
            }
        });
});

app.delete("/mybooks/:id", (req, res) => {
    db.query("DELETE FROM mybooks WHERE id = ?", req.params.id, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});

