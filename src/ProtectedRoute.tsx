import React, {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
    auth?: boolean;
    permissions?: string[];
    isAuthed?: boolean;
    userPermissions?: string[];
    loginRoute?: string;
    notAuthorizedRoute?: string;
    children: any;
}

const ProtectedRoute = ({
    auth,
    permissions,
    isAuthed,
    userPermissions,
    loginRoute,
    notAuthorizedRoute,
    children,
}: ProtectedRouteProps): ReactElement | null => {
    if (auth && !isAuthed) {
        return <Navigate to={loginRoute || '/'} />;
    }
    if (permissions && !permissions?.every((p) => userPermissions?.includes(p))) {
        return <Navigate to={notAuthorizedRoute || '/'} />;
    }
    return children;
};

export default ProtectedRoute;
