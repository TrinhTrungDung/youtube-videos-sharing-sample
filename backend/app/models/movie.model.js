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
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
    });

    return Movie;
};