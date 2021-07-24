const app = require('express')()
const bodyParser = require("body-parser");
const http = require('http').createServer(app)

const aws_config = require('./config/aws.config')

const io = require('socket.io')(http, {
    cors: {
        origin: aws_config.angular_url,
        methods: ["GET", "POST"]
    }
});

const cors = require("cors");

const corsOptions = {
    origin: aws_config.angular_url
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
const db = require("./models");
// db.Messages.sync({force: true});
db.sequelize.sync();

require("./routes/message.routes")(app);

const connectedUser = {}

io.on('connection', (socket) => {
    socket.on('currentUser', data => {
        connectedUser[data.user] = socket
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', async (msg) => {
        if (connectedUser[msg.receiver]) {
            connectedUser[msg.receiver].emit('chat message', msg);
        }
    });
})

http.listen(3000, () => {
    console.log(`listening on port ${3000}`)
})
