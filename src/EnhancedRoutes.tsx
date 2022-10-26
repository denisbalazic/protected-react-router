import React, {cloneElement, ReactElement, ReactNode} from 'react';
import {Route, Routes, RoutesProps} from 'react-router-dom';
import EnhancedRoute from './EnhancedRoute';
import ProtectedRoute from './ProtectedRoute';

interface EnhancedRoutesProps extends RoutesProps {
    isAuthed?: boolean;
    userRoles?: string[];
    notAuthenticatedRoute?: string;
    notAuthenticatedAction?: () => void;
    notAuthorizedRoute?: string;
    notAuthorizedAction?: () => void;
}

const EnhancedRoutes = (props: EnhancedRoutesProps): ReactElement | null => {
    const {
        isAuthed,
        userRoles,
        notAuthenticatedRoute,
        notAuthenticatedAction,
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

            if (element.type !== EnhancedRoute) {
                /*console.log(
                    `[${typeof element.type === 'string' ? element.type : element.type.name}]
                        is not a <Route> component. All component children of <Routes> must be a <Route>`
                );*/
                return;
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
                            isAuthed={isAuthed}
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
            const route = cloneElement(<Route />, routeProps, nextLevelChildren);
            routes.push(route);
        });

        return routes;
    };

    return <Routes {...rest}>{createRoutesFromChildren(children)}</Routes>;
};

export default EnhancedRoutes;
