require("dotenv").config();
const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (token == null) return res.sendStatus(401).send({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403).send({ message: "Invalid token" });
        
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken: verifyToken
}