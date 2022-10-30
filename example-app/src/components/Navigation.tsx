import React from 'react';
import {NavLink} from "react-router-dom";
import useFakeDB from "../fakeDB/useFakeDB";

const Navigation = () => {
    const {setUser} = useFakeDB();
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
            <NavLink to={"/movies"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Movies
            </NavLink>
            <NavLink to={"/messages"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Messages
            </NavLink>
            <NavLink to={"/login"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                Login
            </NavLink>
            <button className="navlink" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navigation;
