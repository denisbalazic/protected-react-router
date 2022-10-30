import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import useFakeDB from "../../fakeDB/useFakeDB";

const NewMovieForm = () => {

    const navigate = useNavigate();
    const [movieTitle, setMovieTitle] = useState('');
    const {createMovie} = useFakeDB();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const createdMovieId = createMovie({title: movieTitle});
        navigate(`/movies/${createdMovieId}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={movieTitle} onChange={e => setMovieTitle(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default NewMovieForm;
