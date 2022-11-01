import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const EditDogForm = () => {
    const {dogId} = useParams();
    const navigate = useNavigate();
    const {editDog, getDog} = usePseudoStore();
    const dog = getDog(Number(dogId));
    const [dogName, setCatName] = useState(dog.title);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        editDog({...dog, name: dogName})
        navigate(`/dogs/${Number(dogId)}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={dogName} onChange={e => setCatName(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default EditDogForm;
