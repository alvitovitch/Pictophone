const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;


const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const prompts = require("./routes/api/prompts");
const drawings = require("./routes/api/drawings");
const guesses = require("./routes/api/guesses");

const bodyParser = require('body-parser');
const passport = require('passport');
const io = require('socket.io')(4040, {
    cors: {
        origin: ['https://pictophone.herokuapp.com'],
        transports: ["xhr-polling"]

    }
})

const path = require('path');


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

// socket.io connection

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message',  (message, room) => {
        socket.to(room).emit('receive-message', message)
    })
    socket.on('join-room', room => {
        socket.join(room)
    })
    socket.on('send-drawing', (drawing, room) => {
        socket.to(room).emit('receive-drawing', drawing)
    })
})

// test

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
app.use("/api/prompts", prompts);
app.use("/api/drawings", drawings);
app.use("/api/guesses", guesses);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

