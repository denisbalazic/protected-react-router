import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useFakeDB from "../../fakeDB/useFakeDB";

const EditMovieForm = () => {
    const {movieId} = useParams();
    const navigate = useNavigate();
    const {editMovie, getMovie} = useFakeDB();
    const movie = getMovie(Number(movieId));
    const [movieTitle, setMovieTitle] = useState(movie.title);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        editMovie({...movie, title: movieTitle})
        navigate(`/movies/${Number(movieId)}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={movieTitle} onChange={e => setMovieTitle(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default EditMovieForm;
