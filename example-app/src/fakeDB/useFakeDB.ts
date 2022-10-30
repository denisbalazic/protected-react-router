import {useContext} from 'react';
import {fakeDBContext} from "./fakeDBContext";

const useFakeDB = () => {
    const [db, setDb] = useContext(fakeDBContext)

    const createMovie = (movie: any) => {
        const newIndex = db.movies.length + 1;
        setDb({...db, movies: [...db.movies, {...movie, id: newIndex}]});
        return newIndex;
    }
    const editMovie = (movie: any) => {
        setDb({...db, movies: db.movies.map((m: any) => m.id === movie.id ? movie : m)})
    }
    const getMovies = () => {
        return db.movies;
    }
    const getMovie = (id: number) => {
        return db.movies.find((m: any) => m.id === id);
    }

    const createMessage = (message: any) => {
        const newIndex = db.messages.length + 1;
        setDb({...db, messages: [...db.messages, {...message, id: newIndex}]});
        return newIndex;
    }
    const editMessage = (message: any) => {
        setDb({...db, messages: db.messages.map((m: any) => m.id === message.id ? message : m)})
    }
    const getMessages = () => {
        return db.messages;
    }
    const getMessage = (id: number) => {
        return db.messages.find((m: any) => m.id === id);
    }

    const setUser = (authed: boolean, roles: string[] | undefined) => {
        setDb({...db, user: {authed, roles}});
    }

    const getUser = () => {
        return db.user;
    }

    return {createMovie, editMovie, getMovies, getMovie, createMessage, editMessage, getMessages, getMessage, setUser, getUser};
};

export default useFakeDB;
