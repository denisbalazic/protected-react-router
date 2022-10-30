import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import useFakeDB from "../../fakeDB/useFakeDB";

const Movies = () => {
    const {getMovies} = useFakeDB();
    const movies = getMovies();

    return (
        <div className="main">
            <div className="sidebar">
                {movies.map((movie: any) => (
                    <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
                ))}
                <Link to={'/movies/new'}>Add New Movie</Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default Movies;
