import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import usePseudoStore from "../../pseudoStore/usePseudoStore";

const Cats = () => {
    const {getCats} = usePseudoStore();
    const cats = getCats();

    return (
        <div className="main">
            <div className="sidebar">
                {cats.map((cat: any) => (
                    <NavLink to={`/cats/${cat.id}`}>{cat.name}</NavLink>
                ))}
                <Link to={'/cats/new'}>Add New Cat</Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default Cats;
