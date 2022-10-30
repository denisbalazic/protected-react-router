import React from 'react';
import {Link, useParams} from "react-router-dom";
import useFakeDB from "../../fakeDB/useFakeDB";

const Movie = () => {
    const {movieId} = useParams();
    const {getMovie} = useFakeDB();
    const movie = getMovie(Number(movieId));
    return (
        <div>
            <p>{movie.title}</p>
            <Link to={`/movies/${movieId}/edit`}>Edit</Link>
        </div>
    );
};

export default Movie;
