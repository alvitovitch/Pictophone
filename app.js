const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const prompts = require("./routes/api/prompts");
const drawings = require("./routes/api/drawings");
const guesses = require("./routes/api/guesses");
const games = require("./routes/api/games");
const cors = require('cors')
const bodyParser = require('body-parser');
const passport = require('passport');

// app.use(function (
//     req, res, next) {
//         res.header('Access-Control-Allow-Origin', '*')
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//         next();
// });

const port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`Server is running on port ${port}`));


const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000", "https://pictophone.herokuapp.com/"],
        transports: ["websocket", "polling"]

    }
})

// const http = require("http");
// const httpServer = http.createServer(app);
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origins: ["http://localhost:3000", "https://pictophone.herokuapp.com/"],
//     methods: ["GET", "POST"],
//     transports: ["websocket"]
//   }
// });

const path = require('path');
const { response } = require('express');


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
    socket.on('join-room', (room) => {

        console.log('joined'
        socket.join(room)
    })
    // socket.on('start-game', room => {
    //     console.log(room)
    //     socket.to(room).emit('start-game', 'hi')
    // })
    socket.on('leave-room', room => {
        socket.leave(room)
    })
    socket.on('send-drawing', (drawing, room) => {
        socket.to(room).emit('receive-drawing', drawing)
    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
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
app.use("/api/prompts", prompts);
app.use("/api/drawings", drawings);
app.use("/api/guesses", guesses);
app.use("/api/games", games);


app.use(cors());

// app.get('/awsUrl', (req, res) => {
//     debugger
//     const url = aws.generateUploadUrl()
//     res.send(url);
// })


// const port = process.env.PORT || 4000;

// app.listen(port, () => console.log(`Server is running on port ${port}`));

// httpServer.listen(port, function () {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });
  