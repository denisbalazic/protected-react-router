import {authContext} from "./AuthProvider";
import {useContext} from "react";

export const useLastLocation = () => {
    const {lastLocation} = useContext(authContext);
    return lastLocation;
}
