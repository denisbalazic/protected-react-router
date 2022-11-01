import React from 'react';
import {NavLink} from "react-router-dom";
import usePseudoStore from "../pseudoStore/usePseudoStore";

const Navigation = () => {
    const {getUser, setUser} = usePseudoStore();
    const {authed, roles} = getUser();
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

            {authed ? (
                <>
                    <div className="navlink" style={{display: "flex"}}>
                        <p>Authed:</p>
                        {roles ? roles.map((role: string) => (
                            <p>{role}</p>
                        )) : 'no role'}
                    </div>
                    <div className="navlink" onClick={handleLogout}>Logout</div>
                </>
            ) : (
                <NavLink to={"/login"} end className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                    Login
                </NavLink>
            )}

        </div>
    );
};

export default Navigation;
