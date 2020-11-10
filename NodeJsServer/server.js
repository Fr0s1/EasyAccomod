const express = require("express");
const path = require('path');
const room = require("./db/room/room");
const roomRouter = require('./router/room')
const userRouter = require('./router/user')

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json())

const roomImage = path.join(__dirname, '/db/room-images/')
app.use(roomRouter)
app.use(userRouter)
app.use(express.static(roomImage))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

console.log(roomImage)