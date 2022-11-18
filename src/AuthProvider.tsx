import {createContext, PropsWithChildren, useEffect, useMemo, useState} from 'react';
import {Location, useLocation} from 'react-router-dom';

interface AuthProviderProps {
    authenticated?: boolean;
    userRoles?: string[];
    rolesHierarchy?: string[];
}

export const authContext = createContext<any>({
    authenticated: false,
    userRoles: [],
    rolesHierarchy: [],
    lastLocation: undefined,
});

const AuthProvider = ({authenticated, userRoles, rolesHierarchy, children}: PropsWithChildren<AuthProviderProps>) => {
    const [lastLocation, setLastLocation] = useState<Location>();
    const [newLocation, setNewLocation] = useState<Location>();

    const location = useLocation();

    useEffect(() => {
        if (newLocation !== location) {
            setLastLocation(newLocation);
            setNewLocation(location);
        }
    }, [location]);

    const contextValue = useMemo(
        () => ({authenticated, userRoles, rolesHierarchy, lastLocation}),
        [authenticated, userRoles, rolesHierarchy, lastLocation]
    );

    return <authContext.Provider value={contextValue}>{children}</authContext.Provider>;
};

export default AuthProvider;
