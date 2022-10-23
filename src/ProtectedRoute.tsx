import React, {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
    isPrivate?: boolean;
    roles?: string[];
    isAuthed?: boolean;
    userRoles?: string[];
    loginRoute?: string;
    notAuthorizedRoute?: string;
    children: any;
}

const ProtectedRoute = ({
    isPrivate,
    roles,
    isAuthed,
    userRoles,
    loginRoute,
    notAuthorizedRoute,
    children,
}: ProtectedRouteProps): ReactElement | null => {
    if (isPrivate && !isAuthed) {
        return <Navigate to={loginRoute || '/'} />;
    }
    if (roles && !roles?.every((p) => userRoles?.includes(p))) {
        return <Navigate to={notAuthorizedRoute || '/'} />;
    }
    return children;
};

export default ProtectedRoute;
