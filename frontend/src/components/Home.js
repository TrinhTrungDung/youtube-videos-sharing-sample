import React, { useState, useEffect } from "react";
import MovieService from "../services/movie.service";

const Home = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        MovieService.getMovies().then(res => {
            setContent(res.data);
        }, err => {
            const _content =
                (err.res && err.res.data) ||
                err.message ||
                err.toString();
                setContent(_content);
        });
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                {content}
            </header>
        </div>
    );
};
export default Home;