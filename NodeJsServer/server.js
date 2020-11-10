const express = require("express");

const roomRouter = require('./router/room')
const userRouter = require('./router/user')

const PORT = process.env.PORT || 8080;
const app = express();

<<<<<<< HEAD
app.use(express.json())

app.use(roomRouter)
app.use(userRouter)

=======
var corsOptions = {
    origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/account.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
>>>>>>> f5e97942f05cf2b062c5d7c54a9404e9b516b148
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

