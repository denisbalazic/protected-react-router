import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import {Location, useLocation} from "react-router-dom";

interface AuthProviderProps {
    authenticated?: boolean;
    userRoles?: string[];
}

export const authContext = createContext<any>({
    authenticated: false,
    userRoles: [],
});

const AuthProvider = (props: PropsWithChildren<AuthProviderProps>) => {
    const {authenticated, userRoles} = props;
    const [lastLocation, setLastLocation] = useState<Location>();

    const location = useLocation();

    useEffect(() => {
        if(lastLocation !== location) {
            setLastLocation(location)
        }
    },[location])

    return (
        <authContext.Provider value={{authenticated: authenticated, userRoles, lastLocation}}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthProvider;
