import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const Dogs = () => {
    const {getDogs} = usePseudoStore();
    const dogs = getDogs();

    return (
        <div className="main">
            <div className="sidebar">
                {dogs.map((dog: any) => (
                    <NavLink to={`/dogs/${dog.id}`}>{dog.name}</NavLink>
                ))}
                <Link to={'/dogs/new'}>Add New Dog</Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default Dogs;
