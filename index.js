const express = require('express');




//import required to parse JSON data as a POST request
const bodyParser = require('body-parser');

//imports required for DB connection and table creation
const sequelize = require('./util/dbconfig');
const User = require('./models/User'); //Without this table was not getting created

//imports requires for different routes
const createUserRoute = require('./routes/createUserRoute');
const getUserRoute = require('./routes/getUserRoute');
const deleteUserRoute = require('./routes/deleteUserRoute');

const app = express();

app.use(bodyParser.json());

//import required to allow CORS origin connection
const cors = require("cors");
app.use(cors());

app.use('/', createUserRoute);
app.use('/', getUserRoute);
app.use('/', deleteUserRoute);

const PORT = 8080;

sequelize.sync({force: true}) //sync is used to create tables in DB, available in models
    .then(result => {
        app.listen(PORT, () => {
            console.log("Listening at port:", PORT);
        });
    })
    .catch(err => console.log(err));