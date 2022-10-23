// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactElement} from 'react';
import {RouteProps} from 'react-router-dom';

type EnhancedRouteProps = RouteProps & {
    isPrivate?: boolean;
    roles?: string[];
};

const EnhancedRoute = (props: EnhancedRouteProps): ReactElement | null => {
    console.log(props);
    return null;
};

export default EnhancedRoute;
