import React, {ReactElement, useContext} from 'react';
import {authContext} from "./AuthProvider";

interface ProtectedWrapperProps {
    isPrivate?: boolean;
    roles?: string[];
    isAuthed?: boolean;
    userRoles?: string[];
    children: any;
}

const ProtectedWrapper = ({isPrivate, roles, children}: ProtectedWrapperProps): ReactElement | null => {
    const {isAuthed, userRoles} = useContext(authContext);

    if (isPrivate && !isAuthed) {
        return null;
    }
    if (roles && !roles?.every((p) => userRoles?.includes(p))) {
        return null;
    }
    return children;
};

export default ProtectedWrapper;
