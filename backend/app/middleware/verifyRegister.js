const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    // Check if request body is empty or not
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Invalid request" });
    }

    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email is already used"
            });
            return;
        }
        next();
    });
}

module.exports = {
    checkDuplicateEmail: checkDuplicateEmail,
}