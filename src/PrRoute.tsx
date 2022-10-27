// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactElement} from 'react';
import {RouteProps} from 'react-router-dom';

type PrRouteProps = RouteProps & {
    isPrivate?: boolean;
    roles?: string[];
};

const PrRoute = (props: PrRouteProps): ReactElement | null => {
    return null;
};

export default PrRoute;
