const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('easyaccomod', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    async function f() {
        await sequelize.authenticate()
    }

    f()

    console.log('Connection has been established successfully.');

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize

// const me = userAccount.build({ username: "frost", password: "hieu" })
// console.log(me instanceof userAccount)
// console.log(me)

// me.save()
// console.log('me was saved to the database!');

// const myRoom = room.build({
//     ID: 1,
//     roomType: "chung cu",
//     rented: false,
//     sharedOwner: false,
//     area: 50,
//     image: 'null',
//     usernameOwner: 'frost'
// })

// myRoom.save()