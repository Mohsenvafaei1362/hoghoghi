// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');

// Create a new express application named 'app'
const app = express();
app.use(express.json());
app.use(cors());


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'maghsoud_vafaei',
//     password: '33451362Mn@',
//     database: 'maghsoud_hoghoghi'
// });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hoghoghi_react'
});

app.post("/insert", (req, res) => {
    const title = req.body.title;
    const request = req.body.request;
    const code = req.body.code;
    const unique = req.body.unique;

    db.query(
        "INSERT INTO `message`(`title`,`request`,`unique`,`code`) VALUES  (?,?,?,?)", [title, request,unique, code],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result) {
                res.send({ result, code: code });
            } else {
                res.send({ message: "Error to Insert data" });
            }
        }
    )
})

app.delete("/deleteMessage/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM `message` WHERE id=?", [id],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result) {
                res.send({ message: 'حذف با موفقیت انجام شد.', result: result, id: id });
            } else {
                res.send({ message: "Error to delete data" });
            }
        })
})

app.put("/response", (req, res) => {
    const id = req.body.id;
    const response = req.body.response;
    const request = req.body.request;
    const title = req.body.title;
    const log = 1;
    const code = req.body.code;

    db.query(
        "UPDATE message SET  title = ?,request = ? , response =? , log = ? , code = ? WHERE id = ?", [title, request, response, log, code, id],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result) {
                res.send({ message: "پاسخ با موفقیت ثبت شد.", result: result, response: response, id: id, title: title, code: code });
            } else {
                res.send({ message: "Error to Insert data" });
            }
        }
    )
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const response = req.body.response;
    const request = req.body.request;
    const title = req.body.title;
    const log = req.body.log;
    const code = req.body.code;

    db.query(
        "UPDATE message SET  title = ?,request = ? , response =? , log = ? , code = ? WHERE id = ?", [title, request, response, log, code, id],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result) {
                res.send({ message: "پرسشنامه با موفقیت ویرایش شد.", result: result, request: request, id: id, title: title, code: code });
            } else {
                res.send({ message: "Error to Update data" });
            }
        }
    )
})

app.post("/follow", (req, res) => {
    const code = req.body.code;
    const unique = req.body.unique;
    console.log('unique:',unique)
  
    db.query(
        // "SELECT * FROM message WHERE code = ? AND unique = ? ", [code , unique],
        "SELECT * FROM message WHERE code = ?", [code],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                // res.send(result);
                res.send({ message: "صفحه پرسش و پاسخ شما", result: result, code: code , unique:unique})
            } else {
                res.send({ message: "کد رهگیری یا رمز عبور وارد شده اشتباه است!" })
            }
        }
    )
})

app.post("/editMessage", (req, res) => {
    const id = req.body.id;
    db.query(
        "SELECT * FROM message WHERE id = ? ", [id],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                // res.send(result);
                res.send({ message: "صفحه ویرایش پرسش و پاسخ شما", result: result })
            } else {
                res.send({ message: "کد رهگیری وارد شده اشتباه است!" })
            }
        }
    )
})

app.post("/login", (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?", [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                // res.send(result);
                res.send({ message: "successfull validate", result: result })
            } else {
                res.send({ message: " نام کاربری یا رمز عبور اشتباه است! " })
            }
        }
    );
})

app.post("/allMessage", (req, res) => {

    db.query(
        "SELECT * FROM message",
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            // if (result.length > 0) {
            if (result) {
                // res.send(result);
                res.send({ message: "successfull validate", result: result })
            } else {
                res.send({ message: "Wrong username/password combination!" })
            }
        }
    );
})

app.post("/info", (req, res) => {

    db.query(
        "SELECT * FROM message WHERE log = 0",
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            // if (result.length > 0) {
            if (result) {
                // res.send(result);
                res.send({ message: "successfull validate", result: result })
            } else {
                res.send({ message: "Wrong username/password combination!" })
            }
        }
    );
})

app.post("/unreadmessage", (req, res) => {

    db.query(
        "SELECT * FROM message WHERE log = 0",
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            // if (result.length > 0) {
            if (result) {
                // res.send(result);
                res.send({ message: "successfull validate", result: result })
            } else {
                res.send({ message: "Wrong username/password combination!" })
            }
        }
    );
})

app.post("/readmessage", (req, res) => {

    db.query(
        "SELECT * FROM message WHERE log = 1",
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            // if (result.length > 0) {
            if (result) {
                // res.send(result);
                res.send({ message: "successfull validate", result: result })
            } else {
                res.send({ message: "Wrong username/password combination!" })
            }
        }
    );
})

app.post("/detaile", (req, res) => {
        const id = req.body.id;
        db.query(
            "SELECT * FROM `message` WHERE id = ?", [id],
            (err, result) => {
                if (err) {
                    res.send({ err: err })
                }
                // if (result.length > 0) {
                if (result) {
                    // res.send(result);
                    res.send({ message: "فرم پاسخ به سوالات", result: result, id: id })
                } else {
                    res.send({ message: "Wrong username/password combination!" })
                }
            }
        );
    })
    // Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 3001;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
// app.use((req, res, next) => {
//     console.log(`Request_Endpoint: ${req.method} ${req.url}`);
//     next();
// });

// Configure the bodyParser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// Configure the CORs middleware
// app.use(cors());
// Require Route
// const api = require('./client/routes/routes');
// Configure app to use route
// app.use('/api/v1/', api);
// This middleware informs the express application to serve our compiled React files
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//     app.use(express.static(path.join(__dirname, 'client/build')));

//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// };

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));