import React from 'react';
import {NavLink} from "react-router-dom";
import usePseudoStore from "../pseudoStore/usePseudoStore";

const Navigation = () => {
    const {setUser} = usePseudoStore();
    const handleLogout = () => {
        setUser(false, undefined);
    }

    return (
        <div className='navigation'>
            <NavLink to={"/"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Home
            </NavLink>
            <NavLink to={"/about"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                About
            </NavLink>
            <NavLink to={"/dogs"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Dogs
            </NavLink>
            <NavLink to={"/cats"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Cats
            </NavLink>
            <NavLink to={"/login"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Login
            </NavLink>
            <button className="navlink" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navigation;
