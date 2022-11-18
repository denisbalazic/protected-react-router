import {useContext} from 'react';
import {authContext} from './AuthProvider';

export const useLastLocation = () => {
    const {lastLocation} = useContext(authContext);
    return lastLocation;
};
