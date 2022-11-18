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
});

const AuthProvider = ({authenticated, userRoles, rolesHierarchy, children}: PropsWithChildren<AuthProviderProps>) => {
    const [lastLocation, setLastLocation] = useState<Location>();

    const location = useLocation();

    useEffect(() => {
        if (lastLocation !== location) {
            setLastLocation(location);
        }
    }, [location]);

    const contextValue = useMemo(
        () => ({authenticated, userRoles, rolesHierarchy, lastLocation}),
        [authenticated, userRoles, rolesHierarchy, lastLocation]
    );

    return <authContext.Provider value={contextValue}>{children}</authContext.Provider>;
};

export default AuthProvider;
