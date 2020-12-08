var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello')
})

const db = require("./models");
db.Messages.sync({force: true});

var connectedUser = {}

io.on('connection', (socket) => {
   
    socket.on('currentUser', data => {
        console.log(data)
        connectedUser[data.user] = socket
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        // console.log(socket.id)
        // console.log(connectedUser)
        console.log(msg)
        // console.log(connectedUser[msg.receiver])
        connectedUser[msg.receiver].emit('chat message', msg);

    });
})

http.listen(3000, () => {
    console.log(`listening on port ${3000}`)
})