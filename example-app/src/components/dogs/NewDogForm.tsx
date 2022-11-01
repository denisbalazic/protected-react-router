import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const NewDogForm = () => {

    const navigate = useNavigate();
    const [dogName, setDogName] = useState('');
    const {createDog} = usePseudoStore();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const createdDogId = createDog({name: dogName});
        navigate(`/dogs/${createdDogId}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={dogName} onChange={e => setDogName(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default NewDogForm;
