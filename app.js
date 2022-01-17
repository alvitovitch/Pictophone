const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const bodyParser = require('body-parser');
const passport = require('passport');
const io = require('socket.io')(5000, {
    cors: {
        origin: ['http://localhost:3000']
    }
})


// socket.io connection

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message',  message => {
        console.log(message)
        socket.broadcast.emit('receive-message', message)
    })
})


// Mongoose connecting to our database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

    
// app.get("/", (req, res) => { 
//     res.send("Pictophone")
// });
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/rooms", rooms);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

