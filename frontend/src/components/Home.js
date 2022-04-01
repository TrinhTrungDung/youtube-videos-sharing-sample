import React, { useState, useEffect, Fragment } from "react";
import MovieService from "../services/movie.service";

const Home = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        MovieService.getMovies().then(res => {
            setMovies(res.data);
        }, err => {
            setMovies([]);
        });
    }, []);

    const renderMovies = () => {
        return movies.map(movie => (
            <Fragment key={movie.id} className="movie-card">
                <section class="movie-card">
                    <figure>
                        <div class="video-overlay">
                            <iframe width="420" height="345" src={`https://www.youtube.com/embed/${new URL(movie.url).searchParams.get("v")}`} title={movie.Title} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <figcaption>{movie.title}</figcaption>
                    </figure>
                    <div class="movie-card-content">
                        <p>{movie.description}</p>
                    </div>
                </section>
            </Fragment>
        ));
    };

    return (
        <div className="movie-container">
            <div class="movie-cards">
                {renderMovies()}
            </div>
        </div>
    );
};
export default Home;