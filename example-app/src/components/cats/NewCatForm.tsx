import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const NewCatForm = () => {

    const navigate = useNavigate();
    const [catName, setCatName] = useState('');
    const {createCat} = usePseudoStore();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const createdCatId = createCat({name: catName});
        navigate(`/cats/${createdCatId}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={catName} onChange={e => setCatName(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default NewCatForm;
