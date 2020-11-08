const express = require("express");

const roomRouter = require('./router/room')
const userRouter = require('./router/user')

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json())

app.use(roomRouter)
app.use(userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

