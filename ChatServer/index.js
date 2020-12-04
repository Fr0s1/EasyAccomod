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
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello')
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
})

http.listen(3000, () => {
    console.log(`listening on port ${3000}`)
})