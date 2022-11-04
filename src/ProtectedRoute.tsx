import React, {PropsWithChildren, ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

interface ProtectedRouteProps {
    isPrivate?: boolean;
    roles?: string[];
    authenticated?: boolean;
    userRoles?: string[];
    notAuthenticatedRoute?: string;
    notAuthenticatedAction?: () => void;
    notAuthorizedRoute?: string;
    notAuthorizedAction?: () => void;
}

const ProtectedRoute = ({
    isPrivate,
    roles,
    authenticated,
    notAuthenticatedRoute,
    notAuthenticatedAction,
    userRoles,
    notAuthorizedRoute,
    notAuthorizedAction,
    children,
}: PropsWithChildren<ProtectedRouteProps>): ReactElement => {
    const location = useLocation();

    if (isPrivate && !authenticated) {
        notAuthenticatedAction && notAuthenticatedAction();
        return <Navigate to={notAuthenticatedRoute || '/'} state={{fromRoute: location.pathname}} />;
    }
    if (roles && !roles?.every((p) => userRoles?.includes(p))) {
        notAuthorizedAction && notAuthorizedAction();
        return <Navigate to={notAuthorizedRoute || '/'} state={{fromRoute: location.pathname}} />;
    }
    return children as ReactElement;
};

export default ProtectedRoute;
