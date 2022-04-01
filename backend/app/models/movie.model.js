module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movies", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        url: {
            type: Sequelize.STRING(2048)
        },
    });

    return Movie;
};