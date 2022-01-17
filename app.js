const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const bodyParser = require('body-parser');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
app.get("/", (req, res) => res.send("Pictophone"));
app.use("/api/users", users);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
