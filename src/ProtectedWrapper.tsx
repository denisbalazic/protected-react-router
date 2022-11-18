import React, {PropsWithChildren, ReactElement, useContext} from 'react';
import {authContext} from './AuthProvider';

interface ProtectedWrapperProps {
    isPrivate?: boolean;
    roles?: string[];
}

const ProtectedWrapper = ({
    isPrivate,
    roles,
    children,
}: PropsWithChildren<ProtectedWrapperProps>): ReactElement | null => {
    const {authenticated, userRoles, rolesHierarchy} = useContext(authContext);

    const getAuthorizedRolesFromRolesHierarchy = (role: string, rolesHierarchy: string[]): string[] => {
        return rolesHierarchy.slice(rolesHierarchy.indexOf(role));
    };

    if ((isPrivate && !(authenticated || userRoles?.length)) || (roles && !userRoles?.length)) {
        return null;
    }

    if (roles && !rolesHierarchy && !userRoles?.some((ur: string) => roles?.includes(ur))) {
        return null;
    }

    if (
        roles &&
        rolesHierarchy &&
        !userRoles?.some((ur: string) => getAuthorizedRolesFromRolesHierarchy(roles[0], rolesHierarchy)?.includes(ur))
    ) {
        return null;
    }
    return children as ReactElement;
};

export default ProtectedWrapper;
