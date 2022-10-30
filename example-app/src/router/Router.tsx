import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';
import Home from "../components/Home";
import NewMovieForm from "../components/movies/NewMovieForm";
import EditMovieForm from "../components/movies/EditMovieForm";
import Movie from "../components/movies/Movie";
import Movies from "../components/movies/Movies";
import About from "../components/About";
import Login from "../components/Login";
import Layout from "../components/Layout";
import MovieIndex from "../components/movies/MovieIndex";
import Messages from "../components/messages/Messages";
import NewMessageForm from "../components/messages/NewMessageForm";
import EditMessageForm from "../components/messages/EditMessageForm";
import useFakeDB from "../fakeDB/useFakeDB";

const Router = (): ReactElement => {
    const {getUser} = useFakeDB();
    const user = getUser();
    return (
        <BrowserRouter>
            <Routes
                isAuthed={user.authed}
                notAuthenticatedRoute={'/login'}
            >
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path={"movies"} element={<Movies />} >
                        <Route index element={<MovieIndex />} />
                        <Route path={":movieId"} element={<Movie />} />
                        <Route roles={['admin']} path={":movieId/edit"} element={<EditMovieForm />} />
                        <Route roles={['admin']} path={"new"} element={<NewMovieForm />} />
                    </Route>
                    <Route isPrivate path={"messages"} element={<Messages />} >
                        <Route path={"new"} element={<NewMessageForm />} />
                        <Route path={":msgId/edit"} element={<EditMessageForm />} />
                    </Route>
                    <Route path={"login"} element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
