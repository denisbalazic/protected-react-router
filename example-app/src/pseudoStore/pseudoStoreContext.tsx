import { createContext, useState } from 'react';
import {seed} from "./seed";

export const pseudoStoreContext = createContext<any[]>([]);

const FakeDBProvider = (props: any) => {
    const [fakeDB, setFakeDB] = useState(seed);

    return (
        <pseudoStoreContext.Provider value={[fakeDB, setFakeDB]}>
            {props.children}
        </pseudoStoreContext.Provider>
    );
};

export default FakeDBProvider;
