require("dotenv").config();
const {
    DB_DIALECT,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_SSL_MODE
  } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    dialectOptions: {
        ssl: {
            require: DB_SSL_MODE,
            rejectUnauthorized: false
        }
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.movie = require("../models/movie.model.js")(sequelize, Sequelize);
db.movie.belongsToMany(db.user, {
    through: "user_shared_movies",
    foreignKey: "movieId",
    otherKey: "userId"
});
db.user.belongsToMany(db.movie, {
    through: "user_shared_movies",
    foreignKey: "userId",
    otherKey: "movieId"
});

module.exports = db;