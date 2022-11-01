import React, {cloneElement, ReactElement, ReactNode} from 'react';
import {Route, Routes, RoutesProps} from 'react-router-dom';
import PrRoute from './PrRoute';
import ProtectedRoute from './ProtectedRoute';
import AuthProvider from './AuthProvider';

interface PrRoutesProps extends RoutesProps {
    authenticated?: boolean;
    notAuthenticatedRoute?: string;
    notAuthenticatedAction?: () => void;
    userRoles?: string[];
    notAuthorizedRoute?: string;
    notAuthorizedAction?: () => void;
}

const PrRoutes = (props: PrRoutesProps): ReactElement | null => {
    const {
        authenticated,
        notAuthenticatedRoute,
        notAuthenticatedAction,
        userRoles,
        notAuthorizedRoute,
        notAuthorizedAction,
        children,
        ...rest
    } = props;

    const createRoutesFromChildren = (children: ReactNode | ReactNode[]): ReactElement[] => {
        const routes: ReactElement[] = [];

        React.Children.forEach(children, (element) => {
            if (!React.isValidElement(element)) {
                return;
            }

            if (element.type !== PrRoute) {
                const errorMessage = `[${
                    typeof element.type === 'string' ? element.type : element.type.name
                }] is not a <PrRoute> component. All component children of <PrRoutes> must be a <PrRoute>`;
                throw new Error(errorMessage);
            }

            let nextLevelChildren = null;
            if (element.props.children) {
                nextLevelChildren = createRoutesFromChildren(element.props.children);
            }

            let routeProps = element.props;
            if (element.props.isPrivate || element.props.roles) {
                routeProps = {
                    ...routeProps,
                    element: (
                        <ProtectedRoute
                            isPrivate={element.props.isPrivate}
                            roles={element.props.roles}
                            authenticated={authenticated}
                            userRoles={userRoles}
                            notAuthenticatedRoute={notAuthenticatedRoute}
                            notAuthenticatedAction={notAuthenticatedAction}
                            notAuthorizedRoute={notAuthorizedRoute}
                            notAuthorizedAction={notAuthorizedAction}
                        >
                            {element.props.element}
                        </ProtectedRoute>
                    ),
                };
            }
            const route = cloneElement(<Route/>, routeProps, nextLevelChildren);
            routes.push(route);
        });

        return routes;
    };

    return (
        <AuthProvider isAuthed={isAuthed} userRoles={userRoles}>
            <Routes {...rest}>
                {createRoutesFromChildren(children)}
            </Routes>
        </AuthProvider>
    );
};

export default PrRoutes;
