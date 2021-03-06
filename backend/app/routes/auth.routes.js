const { verifyRegister } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(_, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.post(
        "/api/auth/register",
        [
            verifyRegister.checkDuplicateEmail
        ],
        controller.register
    );
    app.post("/api/auth/login", controller.login);
}