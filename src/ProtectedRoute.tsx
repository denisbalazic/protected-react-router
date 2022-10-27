import React, {ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

interface ProtectedRouteProps {
    isPrivate?: boolean;
    roles?: string[];
    isAuthed?: boolean;
    userRoles?: string[];
    notAuthenticatedRoute?: string;
    notAuthenticatedAction?: () => void;
    notAuthorizedRoute?: string;
    notAuthorizedAction?: () => void;
    children: any;
}

const ProtectedRoute = ({
    isPrivate,
    roles,
    isAuthed,
    userRoles,
    notAuthenticatedRoute,
    notAuthenticatedAction,
    notAuthorizedRoute,
    notAuthorizedAction,
    children,
}: ProtectedRouteProps): ReactElement | null => {
    const location = useLocation();

    if (isPrivate && !isAuthed) {
        notAuthenticatedAction && notAuthenticatedAction();
        return <Navigate to={notAuthenticatedRoute || '/'} state={{fromRoute: location.pathname}} />;
    }
    if (roles && !roles?.every((p) => userRoles?.includes(p))) {
        notAuthorizedAction && notAuthorizedAction();
        return <Navigate to={notAuthorizedRoute || '/'} state={{fromRoute: location.pathname}} />;
    }
    return children;
};

export default ProtectedRoute;
