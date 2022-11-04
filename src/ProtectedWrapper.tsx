import React, {PropsWithChildren, ReactNode, useContext} from 'react';
import {authContext} from "./AuthProvider";

interface ProtectedWrapperProps {
    isPrivate?: boolean;
    roles?: string[];
}

const ProtectedWrapper = ({isPrivate, roles, children}: PropsWithChildren<ProtectedWrapperProps>): ReactNode => {
    const {authenticated, userRoles} = useContext(authContext);

    if (isPrivate && !authenticated) {
        return null;
    }
    if (roles && !roles?.every((role) => userRoles?.includes(role))) {
        return null;
    }
    return children;
};

export default ProtectedWrapper;
