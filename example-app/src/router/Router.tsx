import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';
import Home from "../components/Home";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import Movie from "../components/Movie";
import Movies from "../components/Movies";
import About from "../components/About";
import Login from "../components/Login";
import Layout from "../components/Layout";

const Router = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes
                isAuthed={false}
            >
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path={"movies"} element={<Movies />} >
                        <Route path={":movieId"} element={<Movie />} />
                        <Route path={":movieId/edit"} element={<EditMovieForm />} />
                        <Route path={"new"} element={<NewMovieForm />} />
                    </Route>
                    <Route path={"login"} element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
