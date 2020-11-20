const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

let test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // await sequelize.sync({ force: true })
  console.log("All models were synchronized successfully.")
}

rooms = require("./rooms.model")(sequelize, DataTypes)
posts = require("./posts.model")(sequelize, DataTypes)
postCost = require("./postCost.model")(sequelize, DataTypes)
accounts = require("./account.model")(sequelize, DataTypes)
users = require("./user.model")(sequelize, DataTypes)

// Liên kết 1 - 1
posts.belongsTo(rooms, { foreignKey: 'roomID' })
accounts.belongsTo(users, { foreignKey: 'userIdCard' }) // 1 người dùng chỉ có 1 tài khoản duy nhất

// Liêt kết 1 - n
accounts.hasMany(posts) // 1 tài khoản chủ trọ có nhiều bài đăng
accounts.hasMany(rooms) // 1 chủ trọ có thể có nhiều phòng


// Liên kết m-n
// posts.belongsToMany(User)
// test()

const db = {
  rooms,
  posts,
  postCost,
  accounts,
  users
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;