import React, {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

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
    if (isPrivate && !isAuthed) {
        notAuthenticatedAction && notAuthenticatedAction();
        return <Navigate to={notAuthenticatedRoute || '/'} />;
    }
    if (roles && !roles?.every((p) => userRoles?.includes(p))) {
        notAuthorizedAction && notAuthorizedAction();
        return <Navigate to={notAuthorizedRoute || '/'} />;
    }
    return children;
};

export default ProtectedRoute;
