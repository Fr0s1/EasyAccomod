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
  },
  timezone: '+07:00'
});

rooms = require("./rooms.model")(sequelize, DataTypes)
posts = require("./posts.model")(sequelize, DataTypes)
postCost = require("./postCost.model")(sequelize, DataTypes)
accounts = require("./account.model")(sequelize, DataTypes)
users = require("./user.model")(sequelize, DataTypes)
comments = require('./comments.model')(sequelize, DataTypes)
userFavorites = require('./userFavorite.model')(sequelize, DataTypes)
reportedPosts = require('./reported-posts.model')(sequelize, DataTypes)
notifications = require('./notification.model')(sequelize, DataTypes)
extendRequests = require('./extendRequest.model')(sequelize, DataTypes)

// Liên kết 1 - 1
posts.belongsTo(rooms, { foreignKey: 'roomID' })
extendRequests.belongsTo(posts, { foreignKey: 'postID' })
accounts.belongsTo(users, { foreignKey: 'userIdCard' }) // 1 người dùng chỉ có 1 tài khoản duy nhất
// userFavorites.belongsTo(accounts, {foreignKey: 'username'})
// userFavorites.belongsTo(posts, {foreignKey: 'postID'})

// Liêt kết 1 - n
accounts.hasMany(posts) // 1 tài khoản chủ trọ có nhiều bài đăng
accounts.hasMany(rooms) // 1 chủ trọ có thể có nhiều phòng
accounts.hasMany(notifications) 

accounts.hasMany(comments)
posts.hasMany(comments)
//accounts.hasMany(userFavorites) // 
posts.belongsToMany(accounts, { through: userFavorites})
accounts.belongsToMany(posts, { through: userFavorites})

// m-n association
// For reported post: 1 account can report many posts, 1 posts can be reported by many accounts
posts.belongsToMany(accounts, { through: {model: reportedPosts, unique: false}, constraints: false})
accounts.belongsToMany(posts, { through: { model: reportedPosts, unique: false }, constraints: false })

const db = {
  rooms,
  posts,
  postCost,
  accounts,
  users,
  comments,
  userFavorites,
  reportedPosts,
  notifications,
  extendRequests
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;