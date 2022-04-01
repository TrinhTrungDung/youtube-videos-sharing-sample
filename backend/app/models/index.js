require("dotenv").config();
const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE_URL);

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