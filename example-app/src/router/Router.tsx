import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';
import Home from "../components/Home";
import NewDogForm from "../components/dogs/NewDogForm";
import EditDogForm from "../components/dogs/EditDogForm";
import Dog from "../components/dogs/Dog";
import Dogs from "../components/dogs/Dogs";
import About from "../components/About";
import Login from "../components/Login";
import Layout from "../components/Layout";
import DogIndex from "../components/dogs/DogIndex";
import Cats from "../components/cats/Cats";
import NewCatForm from "../components/cats/NewCatForm";
import EditCatForm from "../components/cats/EditCatForm";
import usePseudoStore from "../pseudoStore/usePseudoStore";
import CatIndex from "../components/cats/CatIndex";
import Cat from "../components/cats/Cat";

const Router = (): ReactElement => {
    const {getUser} = usePseudoStore();
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
                    <Route  path={"dogs"} element={<Dogs />} >
                        <Route index element={<DogIndex />} />
                        <Route path={":dogId"} element={<Dog />} />
                        <Route path={":dogId/edit"} element={<EditDogForm />} />
                        <Route path={"new"} element={<NewDogForm />} />
                    </Route>
                    <Route path={"cats"} element={<Cats />} >
                        <Route index element={<CatIndex />} />
                        <Route path={":catId"} element={<Cat />} />
                        <Route path={":catId/edit"} element={<EditCatForm />} />
                        <Route path={"new"} element={<NewCatForm />} />
                    </Route>
                    <Route path={"login"} element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
