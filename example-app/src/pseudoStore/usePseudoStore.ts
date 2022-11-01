import {useContext} from 'react';
import {pseudoStoreContext} from "./pseudoStoreContext";

const usePseudoStore = () => {
    const [db, setDb] = useContext(pseudoStoreContext)

    const createDog = (dog: any) => {
        const newIndex = db.dogs.length + 1;
        setDb({...db, dogs: [...db.dogs, {...dog, id: newIndex}]});
        return newIndex;
    }
    const editDog = (dog: any) => {
        setDb({...db, dogs: db.dogs.map((m: any) => m.id === dog.id ? dog : m)})
    }
    const getDogs = () => {
        return db.dogs;
    }
    const getDog = (id: number) => {
        return db.dogs.find((m: any) => m.id === id);
    }

    const createCat = (cat: any) => {
        const newIndex = db.cats.length + 1;
        setDb({...db, cats: [...db.cats, {...cat, id: newIndex}]});
        return newIndex;
    }
    const editCat = (cat: any) => {
        setDb({...db, cats: db.cats.map((m: any) => m.id === cat.id ? cat : m)})
    }
    const getCats = () => {
        return db.cats;
    }
    const getCat = (id: number) => {
        return db.cats.find((m: any) => m.id === id);
    }

    const setUser = (authed: boolean, roles: string[] | undefined) => {
        setDb({...db, user: {authed, roles}});
    }

    const getUser = () => {
        return db.user;
    }

    return {createDog, editDog, getDogs, getDog, createCat, editCat, getCats, getCat, setUser, getUser};
};

export default usePseudoStore;
