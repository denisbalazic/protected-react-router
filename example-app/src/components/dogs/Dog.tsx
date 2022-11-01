import React from 'react';
import {Link, useParams} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const Dog = () => {
    const {dogId} = useParams();
    const {getDog} = usePseudoStore();
    const dog = getDog(Number(dogId));
    return (
        <div>
            <p>{dog.name}</p>
            <Link to={`/dogs/${dogId}/edit`}>Edit</Link>
        </div>
    );
};

export default Dog;
