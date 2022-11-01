import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import {Location, useLocation} from "react-router-dom";

type AuthProviderProps = PropsWithChildren & {
    isAuthed?: boolean;
    userRoles?: string[];
};

export const authContext = createContext<any>({
    isAuthed: false,
    userRoles: [],
    lastLocation: '/',
});

const AuthProvider = (props: AuthProviderProps) => {
    const {isAuthed, userRoles} = props;
    const [lastLocation, setLastLocation] = useState<Location>();

    const location = useLocation();

    useEffect(() => {
        if(lastLocation !== location) {
            setLastLocation(location)
        }
    },[location])

    return (
        <authContext.Provider value={{isAuthed, userRoles, lastLocation}}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthProvider;
