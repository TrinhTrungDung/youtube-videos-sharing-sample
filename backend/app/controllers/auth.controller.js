require("dotenv").config();
const emailValidator = require("../utils/email");
const passwordValidator = require("../utils/password");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    const { email, password } = req.body;
    // Validate email field
    if (!emailValidator.isEmailValid(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password creation
    if (!passwordValidator.isPasswordStrong(password)) {
        return res.status(400).json({ message: "Your password must be at least 8 characters long, has at least one uppercase letter, one lowercase letter, one digit and one special character" });
    }

    User.create({
        email: email,
        password: bcrypt.hashSync(password)
    }).then(() => {
        return res.status(201).json({ message: "User was registered successfully!" });
    }).catch(err => {
        return res.status(500).json({ message: err.message });
    });
}

exports.login = (req, res) => {
    // Check if request body is empty or not
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Invalid request" });
    }

    const { email, password } = req.body;
    // Validate email field
    if (!emailValidator.isEmailValid(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password is not provided in payload
    if (password === undefined) {
        return res.status(400).json({ message: "Missing password" });
    }

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        var isPasswordValid = bcrypt.compareSync(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        
        return res.status(200).json({
            accessToken: token
        });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}