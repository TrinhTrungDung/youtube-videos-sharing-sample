const { authJwt } = require("../middleware");
const controller = require("../controllers/movie.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        req.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/movies", controller.getMovies);
    app.post("/api/movies", authJwt.verifyToken, controller.createMovie);
}