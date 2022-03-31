require("dotenv").config();
const urlParser = require("url");
const db = require("../models");
const Movie = db.movie;
const User = db.user;
const {google} = require("googleapis");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
    version: "v3",
    auth: YOUTUBE_API_KEY
});

exports.getMovies = (_, res) => {
    Movie.findAll().then(movies => {
        return res.status(200).send({
            data: movies
        });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
}



exports.createMovie = (req, res) => {
    // Check if request body is empty or not
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const url = req.body.url;

    const videoId = urlParser.parse(url, true).query.v;
    if (videoId === undefined) {
        return res.status(400).send({ message: "Invalid Youtube URL" });
    }

    youtube.videos.list({
        part: "snippet",
        id: videoId
    }).then(youtubeRes => {
        if (youtubeRes.data.items.length === 0) {
            return res.status(400).send({ message: "Invalid Youtube URL" });
        }

        video = youtubeRes.data.items[0];
        User.findOne({
            where: {
                id: req.userId
            }
        }).then(user => {
            Movie.create({
                title: video.snippet.title,
                description: video.snippet.description,
                url: url
            }).then(movie => {
                user.addMovie(movie);
                return res.status(201).send({
                    message: "Movie created"
                });
            }).catch(err => {
                return res.status(500).send({ message : err.message });
            });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
}