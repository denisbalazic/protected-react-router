import React from 'react';
import {Outlet} from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
    return (
        <>
            <p>layout</p>
            <Navigation />
            <Outlet />
        </>
    );
};

export default Layout;
