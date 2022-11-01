import React from 'react';
import {Link, useParams} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const Cat = () => {
    const {catId} = useParams();
    const {getCat} = usePseudoStore();
    const cat = getCat(Number(catId));
    return (
        <div>
            <p>{cat.name}</p>
            <Link to={`/cats/${catId}/edit`}>Edit</Link>
        </div>
    );
};

export default Cat;
