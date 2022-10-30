import { createContext, useState } from 'react';
import {seed} from "./seed";

export const fakeDBContext = createContext<any[]>([]);

const FakeDBProvider = (props: any) => {
    const [fakeDB, setFakeDB] = useState(seed);

    return (
        <fakeDBContext.Provider value={[fakeDB, setFakeDB]}>
            {props.children}
        </fakeDBContext.Provider>
    );
};

export default FakeDBProvider;
