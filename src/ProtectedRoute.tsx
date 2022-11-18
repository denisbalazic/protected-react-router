import React, {PropsWithChildren, ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

interface ProtectedRouteProps {
    isPrivate?: boolean;
    roles?: string[];
    authenticated?: boolean;
    userRoles?: string[];
    rolesHierarchy?: string[];
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
    rolesHierarchy,
    notAuthorizedRoute,
    notAuthorizedAction,
    children,
}: PropsWithChildren<ProtectedRouteProps>): ReactElement => {
    const location = useLocation();

    const getAuthorizedRolesFromRolesHierarchy = (role: string, rolesHierarchy: string[]): string[] => {
        return rolesHierarchy.slice(rolesHierarchy.indexOf(role));
    };

    if ((isPrivate && !(authenticated || userRoles?.length)) || (roles && !userRoles?.length)) {
        notAuthenticatedAction && notAuthenticatedAction();
        return <Navigate to={notAuthenticatedRoute || '/'} state={{redirectedFromRoute: location.pathname}} />;
    }

    if (roles && !rolesHierarchy && !userRoles?.some((ur) => roles?.includes(ur))) {
        notAuthorizedAction && notAuthorizedAction();
        return <Navigate to={notAuthorizedRoute || '/'} state={{redirectedFromRoute: location.pathname}} />;
    }

    if (
        roles &&
        rolesHierarchy &&
        !userRoles?.some((ur) => getAuthorizedRolesFromRolesHierarchy(roles[0], rolesHierarchy)?.includes(ur))
    ) {
        notAuthorizedAction && notAuthorizedAction();
        return <Navigate to={notAuthorizedRoute || '/'} state={{redirectedFromRoute: location.pathname}} />;
    }
    return children as ReactElement;
};

export default ProtectedRoute;
